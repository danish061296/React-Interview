import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../users.json';

type ResponseSuccessMessage = true;
type ResponseErrorMessage = false;

type User = {
  id: string;
  name: string;
};

type ConvertedResponse = {
  message: ResponseSuccessMessage;
  id: { id: string }[];
};

type ErrorSuccessMessage = {
  message: ResponseErrorMessage;
};

type Data = {
  message: ResponseSuccessMessage;
  users: User[];
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<Data | ConvertedResponse | ErrorSuccessMessage>
) => {
  const convertedResponse = data.map((data) => ({
    id: data.name,
  }));

  if (data) {
    res.status(200).json({ message: true, id: convertedResponse });
  } else {
    res.status(400).json({ message: false });
  }
};
