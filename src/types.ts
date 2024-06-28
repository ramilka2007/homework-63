export interface AddPost {
  title: string;
  description: string;
  datetime?: string;
}

export interface Posts {
  [id: string]: AddPost;
}

export interface Post extends AddPost {
  id: string;
}
