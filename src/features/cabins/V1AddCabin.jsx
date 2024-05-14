// import { useState } from "react";

import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import CabinTable from "./CabinTable";

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         // to be able to close the modal we have to pass this prop
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

function AddCabin() {
  return (
    // we will make whether thw window is open or not inside the modal
    // //we can have multiple window modals
    //we have to associate the modal with the button by the name

    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens='table'>
        <Button>Add new Table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
