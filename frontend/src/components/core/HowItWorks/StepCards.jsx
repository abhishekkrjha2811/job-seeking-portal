const StepCards = ({ steps, bgColor, borderColor }) => (
    <div
        className="mt-16 mb-10 grid grid-cols-1 sm:grid-cols-1 
   md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center lg:w-11/12 md:w-full px-6"
    >
        {steps.map((step, index) => (
            <div
                key={index}
                className={`
          relative rounded-2xl p-6 flex flex-col items-center justify-start
          text-slate-800 border-2 ${borderColor} bg-white
          h-[340px] w-[260px] shadow-xl
          transition-all duration-300 hover:scale-105 hover:shadow-2xl
        `}
            >
                <h3 className="font-bold text-xl text-center mt-8 leading-snug">{step.title}</h3>

                <p className="text-base font-medium text-center mt-4 px-2 text-slate-600 leading-relaxed">{step.description}</p>

                <span className="absolute left-4 top-4 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">{index + 1}</span>

                {/* Background accent effect */}
                <div className={`absolute inset-0 ${bgColor} opacity-10 rounded-2xl -z-10`}></div>
            </div>
        ))}
    </div>
);

export default StepCards;
