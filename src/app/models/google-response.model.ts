interface IPartLTDetails {
  key: string;
  values: string[];
}

interface IPartENDetails {
  key: string;
  values: {
    explanation: string;
    n: string;
    example: string;
  }[];
}

interface IPartLT {
  item: IPartLTDetails[];
}

interface IPartEN {
  item: IPartENDetails[];
}

// @TODO: seems useless
export interface IGoogleResponseInterface {
  n1: any[];
  partLT: IPartLT[]; // index 1
  n2: string;
  n3: any;
  n4: any;
  n5: any;
  n6: number;
  n7: any;
  n8: any;
  n9: any;
  n10: any;
  n11: any;
  partEN: IPartEN[]; // index 12
}
