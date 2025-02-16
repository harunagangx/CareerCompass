interface RoleCardProps {
  value: 'job_seeker' | 'employer';
  displayName: 'Người tìm việc' | 'Nhà tuyển dụng';
  handleClick: (value: 'job_seeker' | 'employer') => void;
}

const RoleCard = ({ value, displayName, handleClick }: RoleCardProps) => {
  return (
    <div
      onClick={() => handleClick(value)}
      className="cursor-pointer p-4 border border-gray-300 rounded-lg shadow-md hover:scale-105 transition"
    >
      <h3 className="text-xl font-bold text-center capitalize">{displayName}</h3>
    </div>
  );
};

export default RoleCard;
