import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  //select StyledModal using useRef hook to attach the event listener to it
  const ref = useRef();

  // Add a global event listners to close the modal when we click outside it.
  useEffect(() => {
    function handleClickOutside(e) {
      //ref.current is the modal istelf and e.target is the child component where the click happened
      //if the click happens inside the modal then it wont close as it will return false
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    //we need to not to listen for this event in bubble phase and listen for it in the capture phase
    //as when we try to open this modal it will open it then detect that its outside modal so will close it in the bubble phase
    //to do so then set a third argument to true and the event will be handled in the capture phase
    // Add the listener when the component mounts
    document.addEventListener("click", handleClickOutside, listenCapturing);

    // Remove the listener when the component unmounts
    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
}
