export default async function handler(req, res) {
  const { produk, audiens, gaya } = req.body;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Buatkan caption promosi singkat untuk produk "${produk}" untuk audiens "${audiens}" dengan gaya "${gaya}". Maksimal 3 kalimat.`,
        },
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ caption: data.choices[0].message.content });
}
