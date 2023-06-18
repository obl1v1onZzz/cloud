import React from 'react';
import styles from './StepView.module.css';
import { steps } from '../../../../stateMachines/screenMachine';
interface IStepView {
	currentStep: number;
	className: 'string';
}
export const StepView: React.FC<IStepView> = ({ currentStep, className }) => {
	return (
		<div className={className}>
			<div className={styles.box}>
				<div className={styles.steps}>
					{Object.values(steps).map((_, i) => {
						return (
							<div
								className={`${styles.circle} ${
									i + 1 < currentStep ? styles.done : currentStep == i + 1 ? styles.current : ''
								}`}>
								<span className={styles.circle_name}>{i + 1}</span>
							</div>
						);
					})}
				</div>
				<div className={styles.progress}>
					<div
						style={{ width: `${((currentStep - 1) / (Object.keys(steps).length - 1)) * 100}%` }}
						className={styles.indicator}></div>
				</div>
			</div>
		</div>
	);
};
