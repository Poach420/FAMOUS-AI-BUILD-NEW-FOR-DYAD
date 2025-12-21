# Digital Ninja App Builder

A powerful AI-driven platform to create, deploy, and scale custom applications without lock-ins or dependencies.

## Features

### 🤖 AI Builder Interface
- **Dynamic Chat Box**: English-based commands for instant app building with real-time progress tracking
- **Code Generator**: AI-powered component generation using GPT-4 (via Supabase)
- **Workspace Tools**:
  - **Preview**: Real-time app and code visualization
  - **Code**: Syntax-highlighted code display with Prism
  - **Problems**: Debugging tools with severity indicators
  - **Configure**: Project settings and logical configurations
  - **Publish**: Secure export and GitHub integration

### 🚀 Supabase Integration
- **ninja-auth**: JWT-based authentication for secure user management
- **ninja-apps**: Full CRUD operations for app management
- **ninja-generate**: GPT-4 powered code generation responding to user instructions
- **ninja-chat**: Conversational AI assistant for building guidance

### 🎨 Modern UI/UX
- Built with React, TypeScript, and Tailwind CSS
- Responsive design with shadcn/ui components
- Real-time progress tracking
- Cross-platform compatibility

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Poach420/FAMOUS-AI-BUILD-NEW-FOR-DYAD.git
cd FAMOUS-AI-BUILD-NEW-FOR-DYAD
```

2. Install dependencies:
```bash
npm install
```

3. Configure Supabase (optional but recommended):
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Supabase Setup

To enable AI-powered features, set up the following Supabase Edge Functions:

1. **ninja-auth**: Authentication with JWT tokens
2. **ninja-apps**: CRUD operations for app data
3. **ninja-generate**: AI code generation with GPT-4
4. **ninja-chat**: Conversational AI assistance

Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Usage

### Builder Interface
1. Navigate to `/builder`
2. Use the chat box to describe what you want to build
3. Switch between tabs to:
   - Preview generated components
   - View syntax-highlighted code
   - Check for problems/errors
   - Configure project settings
   - Publish to GitHub or export locally

### Example Commands
- "Create a button"
- "Generate a login form"
- "Build a card component"
- "Make a data table"

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Code Highlighting**: react-syntax-highlighter with Prism
- **Backend**: Supabase (optional)
- **AI**: GPT-4 via Supabase Edge Functions

## License

This project is private and proprietary.