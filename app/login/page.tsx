import AuthForm from '@/components/AuthForm'

export default function Login() {
  return (
    <>
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-100 to-indigo-50">
    {/* Main heading */}
  <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 text-center">
    Welcome to CSESQuest
  </h1>
  <p className="text-gray-500 mb-8 text-center">
    Your CSES Coding Adventure
  </p>

  {/* Subheadings */}
  <div className="flex flex-col sm:flex-row gap-4 text-center mx-auto">
    <span className="text-gray-600 font-medium hover:text-purple-500 transition">
      Track Your Progress
    </span>
    <span className="text-gray-600 font-medium hover:text-red-400 transition">
      Solve CSES Problems
    </span>
    <span className="text-gray-600 font-medium hover:text-indigo-600 transition">
      Join the Leaderboard
    </span>
  </div>
    <AuthForm mode="login" />
    </div>
    </>

  )
}
