import React from "react";
import Rsidebar from "../../components/app/Rsidebar";
import ListadoColas from "./ListadoColas"
function Rpanel() {
  return (
    <>
      <div className="mx-auto my-12 py-12 vh-100">
        <div className="bg-gray-50 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <ListadoColas />
        </div>
      </div>
      <Rsidebar/>
    </>
  );
}

export default Rpanel;
