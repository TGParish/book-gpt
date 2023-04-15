export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // Process the data as needed
    res.status(200).json({ message: data });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
