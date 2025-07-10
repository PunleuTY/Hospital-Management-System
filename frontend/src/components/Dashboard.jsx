import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Button from "./Common/Button";
import ModalWrapper from "./Common/Modal-wrapper";
import AddAppointment from "./Form/addAppointment.jsx";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const style = {
    infoCard: "border flex-1 p-3 py-5 rounded-md flex flex-col gap-2",
  };

  const cardData = [
    {
      title: "Total Patients",
      value: "1,234",
      icon: FiUsers,
      color: {
        bg: "bg-(--color-bg-light-blue)",
        border: "border-(--color-blue)",
        text: "text-(--color-blue)",
        textDark: "text-(--color-dark-blue)",
      },
      info: "+%12 from last month",
    },
    {
      title: "Appointments Today",
      value: "25",
      icon: MdOutlineDateRange,
      color: {
        bg: "bg-(--color-bg-light-yellow)",
        border: "border-(--color-yellow)",
        text: "text-(--color-yellow)",
        textDark: "text-(--color-dark-yellow)",
      },
      info: "3 appointments finished",
    },
    {
      title: "Total Revenue",
      value: "$1,234",
      icon: FaDollarSign,
      color: {
        bg: "bg-(--color-bg-light-green)",
        border: "border-(--color-green)",
        text: "text-(--color-green)",
        textDark: "text-(--color-dark-green)",
      },
      info: "+%8 from last month",
    },
  ];

  const appointments = [
    {
      patient: "John Doe",
      doctor: "Dr. Smith",
      time: "10:00 AM",
      purpose: "Regular Checkup",
    },
    {
      patient: "Jane Doe",
      doctor: "Dr. Brown",
      time: "11:00 AM",
      purpose: "Follow-up Consultation",
    },
    {
      patient: "Alice Johnson",
      doctor: "Dr. White",
      time: "1:00 PM",
      purpose: "Blood Test Results",
    },
    {
      patient: "John Doe",
      doctor: "Dr. Smith",
      time: "10:00 AM",
      purpose: "Regular Checkup",
    },
    {
      patient: "Jane Doe",
      doctor: "Dr. Brown",
      time: "11:00 AM",
      purpose: "Follow-up Consultation",
    },
    {
      patient: "Alice Johnson",
      doctor: "Dr. White",
      time: "1:00 PM",
      purpose: "Blood Test Results",
    },
  ];

  return (
    <div className="p-5 h-full flex flex-col gap-5 overflow-auto">
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        {cardData.map((card, index) => {
          return (
            <InfoCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              info={card.info}
              style={style}
            />
          );
        })}
      </div>
      <div className="flex-1 flex gap-3 rounded-md">
        <div className="flex-1 flex flex-col gap-3 p-3 border justify-between border-(--color-light-gray) rounded-md">
          <div className="flex items-center gap-3">
            <FaRegClock className="text-(--color-blue) text-[20px]" />
            <p className="text-[22px] font-bold">Upcoming Appointments</p>
          </div>
          <div
            className="flex-1 flex flex-col overflow-y-auto gap-3"
            style={{ maxHeight: "300px" }} // Set a fixed height for the scrollable area
          >
            {appointments.map((appointment, index) => (
              <AppointmentCard key={index} data={appointment} />
            ))}
          </div>
          <Button
            content={"Add Appointment"}
            className={"w-full"}
            onClick={openModal}
          />
          <ModalWrapper
            isOpen={isModalOpen}
            onClose={closeModal}
            size="md" // Options: sm, md, lg, xl, full
            showCloseButton={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
          >
            <AddAppointment onClose={closeModal} />
          </ModalWrapper>
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ title, value, icon: Icon, color, info, style }) => {
  return (
    <div className={`${style.infoCard} ${color.bg} ${color.border}`}>
      <div className={`flex justify-between items-center ${color.text}`}>
        <p>{title}</p>
        <Icon />
      </div>
      <div>
        <p className={`text-[22px] font-bold ${color.textDark}`}>{value}</p>
        <p className={`${color.text} text-[14px]`}>{info}</p>
      </div>
    </div>
  );
};

const AppointmentCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-gray-100">
      <div className="flex justify-between">
        <p className="text-[18px]">{data.patient}</p>
        <p className="text-(--color-blue)">{data.time}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-(--color-gray)">{data.doctor}</p>
        <div className="border border-(--color-light-gray) rounded-lg text-[12px] font-bold px-2 flex items-center justify-center">
          {data.purpose}
        </div>
      </div>
    </div>
  );
};
