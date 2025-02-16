export interface iUser {
  email: string;
  name: string;
  phoneNumber: string;
  avatarUrl: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
}
