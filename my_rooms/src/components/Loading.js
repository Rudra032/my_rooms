import React, { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = () => {
  let [loading, setLoading] = useState(true);
 
  return (
    <div>
      <div className="sweet-loading" style={{marginTop:"300px"}}>
        <ScaleLoader
          color="#000"
          loading={loading}
          cssOverride=""
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loading;
