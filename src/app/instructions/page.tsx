import Link from 'next/link';

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How to Play
          </h1>
          <p className="text-xl text-gray-600">
            Learn the rules for each of our daily brain games
          </p>
        </div>

        {/* More or Less Instructions */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold">More or Less</h2>
                <p className="text-white/80">Test your knowledge of obscure statistics</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Two Statistics Appear</h3>
                  <p className="text-gray-600 mt-1">
                    You&apos;ll see two unrelated statistics presented side by side. These could be anything from population numbers to distances, consumption rates, or measurements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Make Your Choice</h3>
                  <p className="text-gray-600 mt-1">
                    Click on the statistic you think has the larger value. Trust your instincts!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">See the Results</h3>
                  <p className="text-gray-600 mt-1">
                    After you guess, the actual values are revealed along with their sources. Learn something new every day!
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-blue-800 mb-2">Example Question:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700">Annual hot dog consumption in the US (in millions)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700">Miles of railroad track in India</p>
                  </div>
                </div>
                <p className="text-sm text-blue-700 mt-4">
                  Which one is higher? Make your guess!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Instructions */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-400 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold">Timeline</h2>
                <p className="text-white/80">Arrange historical events in order</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Five Events Appear</h3>
                  <p className="text-gray-600 mt-1">
                    You&apos;ll see five historical events displayed in random order. These events are intentionally unrelated to prevent pattern-gaming.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Drag to Reorder</h3>
                  <p className="text-gray-600 mt-1">
                    Drag and drop the events to arrange them in chronological order, from earliest (top) to latest (bottom).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Submit Your Order</h3>
                  <p className="text-gray-600 mt-1">
                    When you&apos;re confident in your arrangement, click Submit. You&apos;ll see which events you placed correctly and learn the actual dates.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-orange-800 mb-2">Example Events:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Invention of the printing press
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    First successful airplane flight
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Discovery of penicillin
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Moon landing
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Founding of the United Nations
                  </li>
                </ul>
                <p className="text-sm text-orange-700 mt-4">
                  Arrange from earliest to most recent!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Before & After Instructions */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-violet-400 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold">Before & After</h2>
                <p className="text-white/80">Discover surprising historical juxtapositions</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Two Facts Appear</h3>
                  <p className="text-gray-600 mt-1">
                    You&apos;ll see two historical facts that seem impossible when compared. These surprising juxtapositions challenge your assumptions about history.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Guess Which Came First</h3>
                  <p className="text-gray-600 mt-1">
                    Click on the fact you believe happened first. The answer is often surprising!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Experience the &quot;Wait, Really?&quot; Moment</h3>
                  <p className="text-gray-600 mt-1">
                    After you guess, the actual years are revealed along with an explanation of why this comparison is so surprising. Prepare to have your mind blown!
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-purple-800 mb-2">Example Question:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700">The Great Pyramid of Giza was built</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700">The last woolly mammoth died</p>
                  </div>
                </div>
                <p className="text-sm text-purple-700 mt-4">
                  Which happened first? The answer might surprise you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* General Rules */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">General Rules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-purple-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">One Play Per Day</h3>
                <p className="text-gray-600 text-sm">
                  Each game can only be played once per calendar day. Come back tomorrow for new challenges!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 text-purple-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Track Your Progress</h3>
                <p className="text-gray-600 text-sm">
                  Your dashboard shows wins, losses, and streaks. See how you improve over time!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 text-purple-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Learn As You Play</h3>
                <p className="text-gray-600 text-sm">
                  Every answer comes with sources and explanations. Expand your knowledge!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 text-purple-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Same Challenge for All</h3>
                <p className="text-gray-600 text-sm">
                  Everyone gets the same questions each day. Compare with friends!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/auth/signin"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Start Playing Now
          </Link>
        </div>
      </div>
    </div>
  );
}
