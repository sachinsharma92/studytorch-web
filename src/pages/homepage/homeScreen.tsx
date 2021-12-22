import { useState } from 'react';
import { Card, Col, Row } from 'antd';
import PieChart from '../../components/charts/pieHighchartChart';

import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import folder1 from "../../assets/images/icons/folder-1.svg";
import folder2 from "../../assets/images/icons/folder-2.svg";
import arrowIcon1 from "../../assets/images/icons/arrow-down1.svg";
import arrowIcon2 from "../../assets/images/icons/arrow-down2.svg";

// Styles
import './styles.scss';
import ColumnHighchartChart from '../../components/charts/columnHighchartChart';
import ScoreHighchartChart from '../../components/charts/scoreHighchartChart';

function HomeScreen() {

	return (
		<PrimaryLayout>
			<div className="homepage-style">
				<Row>
					<Col sm={18}>
						<div className="section-main">
							<h3 className="title3 space-md">Welcome , Ayush</h3>

							<Row gutter={24}>
								<Col sm={6}>
									<div className="card-outline">
										<div className="gray-box">

										</div>
										<h3 className="title-md">
											80%
										</h3>
										<h4 className="description">
											% Score
										</h4>
									</div>
								</Col>

								<Col sm={6}>
									<div className="card-outline">
										<div className="gray-box">

										</div>
										<h3 className="title-md">
											12.5 Hrs
										</h3>
										<h4 className="description">
											Hours Studied
										</h4>
									</div>
								</Col>

								<Col sm={6}>
									<div className="card-outline">
										<div className="gray-box">

										</div>
										<h3 className="title-md">
											45
										</h3>
										<h4 className="description">
											Notes
										</h4>
									</div>
								</Col>

								<Col sm={6}>
									<div className="card-outline">
										<div className="gray-box">

										</div>
										<h3 className="title-md">
											20
										</h3>
										<h4 className="description">
											Collections
										</h4>
									</div>
								</Col>

								<Col sm={6}>
									<div className="card-outline">
										<div className="gray-box">

										</div>
										<h3 className="title-md">
											2
										</h3>
										<h4 className="description">
											Active Quizes
										</h4>
									</div>
								</Col>

								<Col sm={6}>
									<div className="card-outline">
										<div className="gray-box">

										</div>
										<h3 className="title-md">
											5
										</h3>
										<h4 className="description">
											Study Groups
										</h4>
									</div>
								</Col>

								<Col sm={12}>
									<div className="card-outline flex-style">
										<div className="content-sec">
											<h3 className="title-md">
												80%
											</h3>
											<h4 className="description">
												Quizes Success Rate
											</h4>

											<div className="flex-style space-md-top">
												<div>
													<h4 className="title4"><span className='dot-unsuccessful' /> 1</h4>
													<p className="description">
														Unsuccessful
													</p>
												</div>
												<div>
													<h4 className="title4"><span className='dot-Successful' /> 150</h4>
													<p className="description">
														Successful
													</p>
												</div>
											</div>
										</div>

										<PieChart />
									</div>
								</Col>
							</Row>

							<section className="study-section">
									<h3 className="title3">Study Pattern</h3>
									<div className="arrow-icon">
									<p className="description">01 - 21 March, 2021</p>
									<img src={arrowIcon1} />
								</div>
								<ColumnHighchartChart />
							</section>

							<section className="quiz-section">
								<h3 className="title3">Quiz Score Analysis</h3>
								<div className="arrow-icon">
									<p className="description">01 - 21 March, 2021</p>
									<img src={arrowIcon2} />
								</div>

								<Card className="score-chart-card">
									<ScoreHighchartChart />
								</Card>
							</section>
						</div>
					</Col>
					<Col sm={6}>
						<div className="right-section">
							<h4 className="title4">Most Studied Collections</h4>

							<div className="collection-card">
								<div className="icon-folder">
									<img src={folder1} />
								</div>
								<div className="content-sec">
									<h4 className="title4">Maths</h4>
									<p className="description">20 Notes, 2 quizes</p>
								</div>
							</div>

							<div className="collection-card">
								<div className="icon-folder">
									<img src={folder2} />
								</div>
								<div className="content-sec">
									<h4 className="title4">Maths</h4>
									<p className="description">20 Notes, 2 quizes</p>
								</div>
							</div>

							<div className="collection-card">
								<div className="icon-folder">
									<img src={folder2} />
								</div>
								<div className="content-sec">
									<h4 className="title4">Maths</h4>
									<p className="description">20 Notes, 2 quizes</p>
								</div>
							</div>

							<div className="collection-card">
								<div className="icon-folder">
									<img src={folder2} />
								</div>
								<div className="content-sec">
									<h4 className="title4">Maths</h4>
									<p className="description">20 Notes, 2 quizes</p>
								</div>
							</div>

							<h4 className="title4 mt-3">Recent Studied Collections</h4>

							<div className="collection-card">
								<div className="icon-folder">
									<img src={folder1} />
								</div>
								<div className="content-sec">
									<h4 className="title4">Maths</h4>
									<p className="description">20 Notes, 2 quizes</p>
								</div>
							</div>

							<div className="collection-card">
								<div className="icon-folder">
									<img src={folder1} />
								</div>
								<div className="content-sec">
									<h4 className="title4">Maths</h4>
									<p className="description">20 Notes, 2 quizes</p>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</PrimaryLayout>
	)
}

export default HomeScreen;
// export default requireAuth(HomeScreen);