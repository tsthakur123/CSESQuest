import AuthForm from '@/components/AuthForm'

export default function Login() {
  return (
    <>
    <div className="h-screen flex flex-col bg-[#0d1117]">
    {/* Main heading */}
  <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#f0f6fc] text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
    CSESQuest
  </h1>
  <p className="text-[#8b949e] mb-8 text-center" style={{ fontFamily: 'Oxanium, sans-serif', fontSize: '18px' }}>
    Your CSES Coding Adventure
  </p>

  {/* Subheadings */}
  <div className="flex flex-col sm:flex-row gap-4 text-center mx-auto">
    <span className="text-[#58a6ff] font-medium hover:text-[#4c9eff] transition-colors" style={{ fontFamily: 'Oxanium, sans-serif' }}>
      Track Your Progress
    </span>
    <span className="text-[#3fb950] font-medium hover:text-[#2ea043] transition-colors" style={{ fontFamily: 'Oxanium, sans-serif' }}>
      Solve CSES Problems
    </span>
    <span className="text-[#bc8cff] font-medium hover:text-[#a371f7] transition-colors" style={{ fontFamily: 'Oxanium, sans-serif' }}>
      Join the Leaderboard
    </span>
  </div>
    <AuthForm mode="login" />
    </div>
    </>
  )
}
