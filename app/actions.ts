"use server"

export async function enhancePrompt(prompt: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert AI image prompt engineer. Your task is to enhance user prompts to create stunning, detailed image generation prompts. 

When enhancing prompts:
- Add specific artistic style (e.g., digital art, oil painting, photography, 3D render)
- Include lighting details (e.g., golden hour, dramatic lighting, soft ambient light)
- Add composition elements (e.g., close-up, wide angle, aerial view)
- Include mood and atmosphere descriptors
- Add quality boosters (e.g., highly detailed, 8k, masterpiece, professional)
- Keep the enhanced prompt under 200 words
- Maintain the core concept while making it more visually specific

Return ONLY the enhanced prompt, no explanations or additional text.`,
        },
        {
          role: "user",
          content: `Enhance this image prompt: "${prompt}"`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to enhance prompt")
  }

  const data = await response.json()
  return data.choices[0].message.content.trim()
}

export async function generateImage(prompt: string): Promise<string> {
  const maxRetries = 3
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout

      const response = await fetch("https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            num_inference_steps: 30,
          },
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.status === 503) {
        const data = await response.json()
        const waitTime = data.estimated_time || 20
        console.log(`Model is loading, waiting ${waitTime}s before retry...`)
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000))
        continue
      }

      if (response.status === 504) {
        console.log(`Attempt ${attempt}: Gateway timeout, retrying...`)
        await new Promise((resolve) => setTimeout(resolve, 5000))
        continue
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Image generation error:", errorText)
        throw new Error(`Failed to generate image (Status: ${response.status})`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString("base64")
      return base64
    } catch (error) {
      lastError = error as Error
      if ((error as Error).name === "AbortError") {
        console.log(`Attempt ${attempt}: Request timed out, retrying...`)
        continue
      }
      if (attempt === maxRetries) break
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }

  throw new Error(
    lastError?.message ||
      "Failed to generate image after multiple attempts. The model may be busy - please try again in a moment.",
  )
}
