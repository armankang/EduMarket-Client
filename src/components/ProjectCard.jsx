import moment from "moment";
import { Link } from "react-router-dom";

const ProjectCard = ({ job }) => {
  console.log(job);
  return (
    <Link to={`/project-detail/${job._id}`}>
      <div className="w-full md:w-[16rem] 2xl:w-[18rem] h-[22rem] md:h-[21rem] bg-white flex flex-col justify-between shadow-lg rounded-md px-3 py-5">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex gap-3">
            <img
              src={job?.img}
              alt={job?.name}
              width={"100%"}
              height={"100%"}
            />
          </div>

          <div className="py-3">
            <p className="text-base font-semibold">{job?.projectTitle}</p>
            <p className="text-sm">{job?.desc?.slice(0, 100) + "..."}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="bg-gray-200 text-black py-0.5 px-1.5 rounded font-semibold text-sm">
              ₹ {job?.sellingAmount}
            </p>
            <span className="text-gray-500 text-sm">
              {moment(job?.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
