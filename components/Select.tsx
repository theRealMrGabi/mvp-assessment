import { FC } from "react";
import RSelect from "react-select";

interface SelectProps {
	options: {
		value: string;
		label: string;
	}[];
	onChange?: ({ value }: any) => void;
	placeholder?: string;
	height?: string;
	label?: string;
	name?: string;
	disabled?: boolean;
}

export const Select: FC<SelectProps> = ({
	options,
	onChange,
	placeholder,
	height,
	label,
	name,
	disabled,
	...rest
}) => {
	const styles = {
		control: (provided: any, state: any) => ({
			...provided,
			borderRadius: "4px",
			height: height ?? "1rem",
			backgroundColor: "#1bc5bd",
			fontSize: "0.875rem",
			lineHeight: "1.25rem",
			border: "none",
			hover: "none",
			marginTop: "1.5rem",
			boxShadow: 0,
			"&:hover": {
				border: "none",
			},
			color: "#ffffff",
			padding: "0 0.3rem",
		}),
		indicatorSeparator: (provided: any, state: any) => ({
			...provided,
			display: "none",
		}),
		dropdownIndicator: (provided: any, state: any) => ({
			...provided,
			color: "#ffffff",

			"&:hover": {
				color: "#ffffff",
			},
		}),
		placeholder: (provided: any, state: any) => ({
			...provided,
			color: "#ffffff",
			caretColor: "none",
		}),
		option: (provided: any, state: any) => ({
			...provided,
			color: "#ffffff",
			backgroundColor: "#1bc5bd",
		}),
		singleValue: (provided: any, state: any) => ({
			...provided,
			color: "#ffffff",
			caretColor: "none",
		}),
	};

	return (
		<div className="">
			<label
				className="text-xs font-medium capitalize text-black"
				htmlFor={name}
			>
				{label}
			</label>
			<RSelect
				{...rest}
				placeholder={placeholder}
				onChange={onChange}
				options={options}
				styles={styles}
				isDisabled={disabled}
			/>
		</div>
	);
};
