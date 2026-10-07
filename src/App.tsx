import { useState } from "react";

export default function App() {

  interface Task {
    title: string;
    details: string;
  }

  const [title, setTitle] = useState('')
  const [details, setDetail] = useState('')

  const [task, setTask] = useState<Task[]>([])

  const submitHandler = (elem: React.FormEvent<HTMLFormElement>) => {
    elem.preventDefault()

    if (title.trim() === "" || details.trim() === "") {
      return
    }

    const CopyTask = [...task]
    CopyTask.push({ title, details })
    setTask(CopyTask)

    setTitle('')
    setDetail('')
  }

  const deleteNote = (idx: number) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F1EAD9] text-[#262220]">

      {/* Left Side */}
      <form
        onSubmit={(elem) => {
          submitHandler(elem)
        }}
        className="lg:w-[38%] px-8 py-12 sm:px-14 sm:py-16 flex flex-col min-h-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 43px, #DDD2B8 44px)",
          backgroundPosition: "0 92px"
        }}
      >

        <p className="text-sm text-[#8A7F6E] mb-2">
          {task.length === 0
            ? "Nothing pinned yet"
            : `${task.length} note${task.length === 1 ? "" : "s"} pinned`}
        </p>

        <h1 className="text-5xl sm:text-6xl font-medium leading-[0.95] mb-10">
          Write it
          <br />
          down.
        </h1>

        <div className="flex flex-col gap-8 flex-1">

          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8A7F6E]">
              Heading
            </label>

            <input
              type="text"
              placeholder="Enter your note"
              value={title}
              onChange={(elem) => {
                setTitle(elem.target.value)
              }}
              className="bg-transparent border-0 border-b-2 border-[#262220]/20 pb-2 outline-none text-xl focus:border-[#3F5D54] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs text-[#8A7F6E]">
              Details
            </label>

            <textarea
              placeholder="Enter your note details"
              className="bg-transparent border-0 border-b-2 border-[#262220]/20 pb-2 outline-none resize-none leading-8 focus:border-[#3F5D54] transition-colors"
              value={details}
              onChange={(elem) => {
                setDetail(elem.target.value)
              }}
              rows={6}
            />
          </div>

          <button
            type="submit"
            className="self-start rounded-full px-8 py-3 text-sm bg-[#3F5D54] text-[#F1EAD9] hover:-rotate-2 active:scale-95 transition-transform"
          >
            Pin it to the board
          </button>

        </div>
      </form>

      {/* Right Side */}
      <div
        className="lg:w-[62%] px-8 py-12 sm:px-14 sm:py-16 lg:min-h-screen"
        style={{
          backgroundColor: "#EADFC8",
          backgroundImage:
            "radial-gradient(rgba(38,34,32,0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      >

        <h1 className="text-2xl italic mb-8">
          The board
        </h1>

        {task.length === 0 ? (

          <div className="border-2 border-dashed border-[#262220]/20 rounded-2xl px-8 py-16 text-center max-w-sm">
            <p className="text-lg italic text-[#8A7F6E]">
              Empty for now. Your first note goes here.
            </p>
          </div>

        ) : (

          <div className="flex flex-wrap gap-8 items-start">

            {task.map((elem, idx) => {

              const noteStyles = [
                "bg-[#F6E9C9] -rotate-2",
                "bg-[#E4DED0] rotate-1",
                "bg-[#DCE5DC] -rotate-1",
                "bg-[#F0DAD1] rotate-2"
              ]

              return (
                <div
                  key={idx}
                  className={`group relative w-60 min-h-[15rem] p-5 pt-7 flex flex-col justify-between shadow-md hover:shadow-xl hover:rotate-0 transition-all duration-200 ${noteStyles[idx % noteStyles.length]}`}
                >

                  {/* Pin */}
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B5473F] shadow-sm"></span>

                  <div>
                    <h1 className="text-lg leading-tight mb-2 break-words font-medium">
                      {elem.title}
                    </h1>

                    <h3 className="text-sm leading-relaxed break-words text-[#514A42]">
                      {elem.details}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      deleteNote(idx)
                    }}
                    className="self-end mt-3 w-7 h-7 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity bg-[#262220]/10"
                  >
                    ×
                  </button>

                </div>
              )
            })}

          </div>

        )}

      </div>
    </div>
  );
}