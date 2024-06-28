export interface AddPost {
  title: string;
  description: string;
  datetime?: string;
}

export interface FullPost {
  id: string;
  title: string;
  description: string;
  datetime: string;
}

export interface Posts {
  [id: string]: AddPost;
}

export interface Contacts {
  instagram: string;
  instagramLink: string;
  github: string;
  githubLink: string;
}
