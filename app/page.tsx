"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Wand2, ImageIcon, Loader2, Download, RefreshCw, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { enhancePrompt, generateImage } from "./actions"

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [enhancedPrompt, setEnhancedPrompt] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEnhanced, setShowEnhanced] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleEnhanceAndGenerate = async () => {
    if (!prompt.trim()) return
    setError(null)
    setIsEnhancing(true)
    setShowEnhanced(false)

    try {
      const enhanced = await enhancePrompt(prompt)
      setEnhancedPrompt(enhanced)
      setShowEnhanced(true)
      setIsEnhancing(false)
      setIsGenerating(true)

      const base64Image = await generateImage(enhanced)
      setImageUrl(`data:image/png;base64,${base64Image}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsEnhancing(false)
      setIsGenerating(false)
    }
  }

  const handleDirectGenerate = async () => {
    if (!prompt.trim()) return
    setError(null)
    setIsGenerating(true)
    setShowEnhanced(false)
    setEnhancedPrompt("")

    try {
      const base64Image = await generateImage(prompt)
      setImageUrl(`data:image/png;base64,${base64Image}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `ai-generated-${Date.now()}.png`
    link.click()
  }

  const handleReset = () => {
    setPrompt("")
    setEnhancedPrompt("")
    setImageUrl(null)
    setError(null)
    setShowEnhanced(false)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-violet-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-400">Powered by FLUX & Llama</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            Vision Studio
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your ideas into stunning visuals. Use our AI-powered prompt enhancement for even better results.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
              <Textarea
                placeholder="Describe the image you want to create... (e.g., 'A futuristic city at sunset with flying cars')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] bg-background/50 border-border/50 resize-none text-lg focus-visible:ring-violet-500/50"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleEnhanceAndGenerate}
                    disabled={!prompt.trim() || isEnhancing || isGenerating}
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold shadow-lg shadow-violet-500/25"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enhancing Prompt...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-2" />
                        Enhance & Generate
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleDirectGenerate}
                    disabled={!prompt.trim() || isEnhancing || isGenerating}
                    variant="outline"
                    className="w-full h-12 border-2 border-cyan-500/50 hover:bg-cyan-500/10 font-semibold bg-transparent"
                  >
                    {isGenerating && !isEnhancing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Quick Generate
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Prompt Display */}
          <AnimatePresence>
            {showEnhanced && enhancedPrompt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-violet-400">Enhanced Prompt</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{enhancedPrompt}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8">
                <div className="relative aspect-square max-w-xl mx-auto rounded-2xl overflow-hidden bg-card/50 border border-border/50">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      className="relative w-24 h-24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-violet-500/20" />
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500" />
                    </motion.div>
                    <motion.p
                      className="mt-6 text-muted-foreground"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Creating your masterpiece...
                    </motion.p>
                  </div>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated Image */}
          <AnimatePresence>
            {imageUrl && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20 }}
                className="mt-8"
              >
                <div className="relative max-w-xl mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-2xl blur opacity-30" />
                  <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50">
                    <motion.img
                      src={imageUrl}
                      alt="Generated image"
                      className="w-full aspect-square object-cover"
                      initial={{ filter: "blur(20px)" }}
                      animate={{ filter: "blur(0px)" }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex gap-2 justify-end">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={handleDownload}
                            size="sm"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={handleReset}
                            size="sm"
                            variant="outline"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 text-white"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            New Image
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: "✨",
                title: "Be Descriptive",
                description: "Include details about style, lighting, and mood",
              },
              {
                icon: "🎨",
                title: "Specify Style",
                description: "Mention art styles like 'digital art' or 'oil painting'",
              },
              {
                icon: "🔮",
                title: "Use Enhancement",
                description: "Let AI expand your prompt for better results",
              },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h3 className="font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Created With 🖤{" "}
            <span className="font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              SALAR SHAH
            </span>
          </p>
        </motion.footer>
      </div>
    </div>
  )
}
