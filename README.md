# 🎨 Vision Studio - AI Image Generation App

Preview Link : https://visionstudioai.vercel.app/

A modern, beautifully designed AI-powered image generation application that transforms your text prompts into stunning visuals. Built with Next.js 16, React 19, and powered by FLUX.1-dev and Llama 3.3 AI models.

![Vision Studio](https://img.shields.io/badge/Next.js-16.0.7-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Image Generation**: Generate high-quality images using FLUX.1-dev model from Hugging Face
- **Intelligent Prompt Enhancement**: Leverage Llama 3.3-70B to automatically enhance your prompts for better results
- **Dual Generation Modes**:
  - **Enhance & Generate**: Automatically improves your prompt before generating
  - **Quick Generate**: Direct image generation from your original prompt
- **Real-time Preview**: See your generated images instantly
- **Image Download**: Save generated images directly to your device

### 🎨 User Experience
- **Dark/Light Mode Toggle**: Beautiful theme switching with smooth animations
- **Stunning UI/UX**: 
  - Animated gradient backgrounds
  - Smooth transitions and hover effects
  - Glass-morphism design elements
  - Responsive layout for all devices
- **Loading States**: Elegant loading animations and progress indicators
- **Error Handling**: Robust error handling with automatic retries and user-friendly messages
- **Tips & Guidance**: Built-in tips to help users create better prompts

## 🚀 Tech Stack

### Frontend Framework
- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Headless UI components
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library

### AI Integration
- **FLUX.1-dev** - Image generation model (via Hugging Face)
- **Llama 3.3-70B** - Prompt enhancement (via Groq API)

### Additional Libraries
- **next-themes** - Theme management
- **react-hook-form** - Form handling
- **zod** - Schema validation
- **sonner** - Toast notifications
- **recharts** - Charting library

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm package manager (or npm/yarn)
- API Keys:
  - Hugging Face API token
  - Groq API token

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd VisionStudioAI
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure API Keys**
   
   Update the API keys in `app/actions.ts`:
   - Replace Groq API key on line 8
   - Replace Hugging Face API key on line 59

4. **Run the development server**
```bash
pnpm dev
```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
image-generation-model/
├── app/
│   ├── actions.ts          # Server actions for AI integration
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── theme-provider.tsx  # Theme context provider
├── hooks/                  # Custom React hooks
├── lib/
│   └── utils.ts           # Utility functions
├── styles/
│   └── globals.css        # Additional global styles
├── components.json        # shadcn/ui configuration
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Usage

1. **Enter Your Prompt**: Describe the image you want to create in the text area
   ```
   Example: "A futuristic city at sunset with flying cars"
   ```

2. **Choose Generation Mode**:
   - **Enhance & Generate**: AI will enhance your prompt and generate the image
   - **Quick Generate**: Generate directly from your original prompt

3. **View Enhanced Prompt**: If using enhancement, see how AI improved your prompt

4. **Download Your Image**: Click the download button to save your creation

## 🎨 Tips for Better Results

- **Be Descriptive**: Include details about style, lighting, and mood
- **Specify Style**: Mention art styles like "digital art", "oil painting", "3D render"
- **Use Enhancement**: Let AI expand your prompt for professional results
- **Include Details**: Add composition, color palette, and atmosphere descriptors

## 🔧 Configuration

### Environment Variables
The project currently uses hardcoded API keys (not recommended for production). Consider creating a `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### Model Configuration
Edit `app/actions.ts` to customize:
- **Prompt Enhancement Model**: Currently using `llama-3.3-70b-versatile`
- **Image Generation Model**: Currently using `black-forest-labs/FLUX.1-dev`
- **Generation Parameters**: Adjust `num_inference_steps` (default: 30)
- **Timeout Settings**: Modify retry logic and timeout duration

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 🎨 Customization

### Styling
- Modify Tailwind configuration in `components.json`
- Update global styles in `app/globals.css`
- Customize theme colors using CSS variables

### Components
- All UI components are in `components/ui/`
- Built with Radix UI primitives
- Fully customizable and accessible

### Animations
- Powered by Framer Motion
- Customize animations in `app/page.tsx`
- Modify transition timings and effects

## 🐛 Known Issues & Troubleshooting

### Model Loading Delays
- The FLUX model may take 20-60 seconds to load on first request
- The app includes automatic retry logic with exponential backoff

### Timeout Errors
- Default timeout is 2 minutes per generation
- Adjust timeout in `app/actions.ts` if needed

### API Rate Limits
- Both Groq and Hugging Face have API rate limits
- Consider implementing request queuing for production use

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Compatible with any Node.js hosting platform
- Ensure Node.js 18+ is available
- Configure environment variables appropriately

## 🔒 Security Considerations

⚠️ **Important**: 
- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add authentication if needed
- Sanitize user inputs

## 👨‍💻 Author

Created with 🖤 by **SALAR SHAH**

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) - Image generation model
- [Llama 3.3](https://groq.com/) - Prompt enhancement
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel](https://vercel.com/) - Analytics and hosting

## 📞 Support

For issues, questions, or contributions, please contact the project maintainer.

---

**Enjoy creating stunning AI-generated images! 🎨✨**
