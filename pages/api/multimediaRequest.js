export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetFile?idobject=${req.body.idobject}&type=${req.body.type}&subtype=${req.body.subtype}`
    );
    /* if (!response.ok) {
      const errorText = await response.text();
      console.log('Error: ', errorText);
      throw new Error(
        `Bad response from server: Request multimedia - ${errorText}`
      );
    }*/

    const multimedia = await response.json();

    if (multimedia) {
      res.status(200).json(multimedia);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
