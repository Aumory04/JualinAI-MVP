import { useState, useEffect } from 'react';

export default function Fitur() {
  const [produk, setProduk] = useState('');
  const [audiens, setAudiens] = useState('');
  const [gaya, setGaya] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [token, setToken] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const usage = parseInt(localStorage.getItem('jumlahPakai') || '0', 10);
    const premiumUser = localStorage.getItem('premiumUser');
    if (usage >= 10 && premiumUser !== 'true') setPopup(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produk, audiens, gaya }),
    });

    const data = await res.json();
    setResult(data.caption);
    setLoading(false);

    const count = parseInt(localStorage.getItem('jumlahPakai') || '0', 10) + 1;
    localStorage.setItem('jumlahPakai', count);
    const premiumUser = localStorage.getItem('premiumUser');
    if (count >= 10 && premiumUser !== 'true') setPopup(true);
  };

  const verifyToken = () => {
    if (token === 'PREMIUM2024') {
      localStorage.setItem('premiumUser', true);
      setIsPremium(true);
      setPopup(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fitur: Buat Caption</h1>
      <input className="border p-2 w-full mb-3 rounded" placeholder="Token Premium (jika ada)" value={token} onChange={(e) => setToken(e.target.value)} />
      <button onClick={verifyToken} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Aktifkan Token</button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border w-full p-2 rounded" placeholder="Nama Produk" value={produk} onChange={(e) => setProduk(e.target.value)} required />
        <input className="border w-full p-2 rounded" placeholder="Target Audiens" value={audiens} onChange={(e) => setAudiens(e.target.value)} required />
        <input className="border w-full p-2 rounded" placeholder="Gaya Bahasa (santai, formal, lucu...)" value={gaya} onChange={(e) => setGaya(e.target.value)} required />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit" disabled={loading}>
          {loading ? 'Sedang membuat...' : 'Buat Caption'}
        </button>
      </form>

      {result && <div className="mt-6 p-4 bg-gray-100 rounded shadow"><h2 className="font-bold mb-2">Hasil Caption:</h2><p>{result}</p></div>}

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center max-w-sm">
            <h2 className="text-xl font-bold mb-4">Batas Gratis Tercapai</h2>
            <p className="mb-4">Kamu telah menggunakan JualinAI 10 kali. Upgrade sekarang untuk akses penuh!</p>
            <a href="https://wa.me/6281234567890?text=Halo%20admin,%20saya%20ingin%20upgrade%20JualinAI" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
              UPGRADE SEKARANG
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
