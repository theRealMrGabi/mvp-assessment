import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ name, label, ...rest }, ref) => {
		return (
			<div className="w-full">
				<label htmlFor={name} className="text-xs text-base-gray-200">
					{label}
				</label>
				<div className="">
					<input
						{...rest}
						name={name}
						ref={ref}
						type={rest.type}
						className={`rounded bg-base-green-100 p-[0.4rem] text-sm text-white focus:outline-none`}
					/>
				</div>
			</div>
		);
	}
);
