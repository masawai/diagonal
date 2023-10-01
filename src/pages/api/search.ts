import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'

const columnMapping = {
  nameColumn: 'name',
  genreColumn: 'genre',
  prefectureColumn: 'prefecture'
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { column: rawColumn, value } = req.query;
  const column = rawColumn as keyof typeof columnMapping;

  // クエリパラメータ 'column' と 'value' の存在を確認
  if (!column || !value) {
    return res.status(400).json({ error: 'Column and value are required' });
  }

  // マッピングからデータベースのカラム名を取得
  const dbColumn = columnMapping[column];
  if (!dbColumn) {
    return res.status(400).json({ error: 'Invalid column name' });
  }


  try {
    const items = await prisma.restaurant.findMany({
      where: {
        [dbColumn]: value,
      },
    });

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default handler
