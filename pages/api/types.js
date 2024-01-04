export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetPropertyTypes?username=${req.body.id}&projectId=${req.body.projectId}`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const types = await response.json();

    if (types) {
      res.status(200).json(types);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Types not found' });
  }
}
