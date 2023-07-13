interface ITC {
  input: String;
  output: String;
}

interface IQuestion {
  _id?: string;
  title: string;
  description: string;
  testCases: [ITC];
}

export { IQuestion, ITC };
