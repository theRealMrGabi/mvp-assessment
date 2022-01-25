import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ text, loading, ...rest }) => {
	return (
		<button
			{...rest}
			disabled={loading || rest.disabled}
			className="rounded bg-base-blue-100 p-2 text-sm text-white"
		>
			{text}
		</button>
	);
};
