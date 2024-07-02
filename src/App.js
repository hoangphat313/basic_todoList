import { useState } from "react";


function App() {
  const [value, setValue] = useState('')

  return (
    <div className=" flex gap-4 h-screen justify-center items-center">
      <input type="text" className=" outline-none border border-blue-600 px-4 py-2 w-[400px] "
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        type="button"
        className=" outline-none px-4 py-2 bg-blue-500 rounded-md text-white "
      >
        Add
      </button>
    </div>
  );
}

export default App;
