import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-4">Selamat Datang di JualinAI</h1>
      <p className="mb-6 text-lg">Buat caption promosi produkmu secara instan dengan bantuan AI.</p>
      <Link href="/fitur">
        <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Mulai Sekarang</a>
      </Link>
    </div>
  )
}
