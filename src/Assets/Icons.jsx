import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const SendIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faPaperPlane}
      style={{ color: "#0fac34", fontSize: "20px", cursor: "pointer" }}
    />
  );
};

const PlusIcon = () => {
  return <FontAwesomeIcon icon={faPlus} />;
};

const CloseIcon = () => {
    return <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#d50000", fontSize: "24px"}}/>
}

export { SendIcon, PlusIcon, CloseIcon };
