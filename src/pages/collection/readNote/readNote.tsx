import { Button, Breadcrumb, Tag, } from 'antd';
import PrimaryLayout from '../../../common/primaryLayout/primaryLayout';
import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";

// Images

// Styles
import './styles.scss';

function ReadNoteScreen(props: any) {

	return (
		<PrimaryLayout>
			<div className="read-note-style">
				<div className="action-section">

					<div className="top-button-section">
						<Button className="btn-outline"><img src={iconArrowLeft} /> Back</Button>
					</div>

					<Breadcrumb>
						<Breadcrumb.Item>
							<a href="">Adding in Collections</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Chemistry</Breadcrumb.Item>
					</Breadcrumb>
					</div>
					<div className="view-section">
						<h1 className="title1">Inorganic chemistry</h1>
						<div className="tag-section">
							<Tag className="tag-style">Organic</Tag>
							<Tag className="tag-style">chemistry</Tag>
						</div>
						<p className="description">
							Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
						</p>
						<h3 className="title3">1. Review of Chemical Bonding</h3>
						<h4 className="title4">1.1 Prelude to Chemical Bonding</h4>
						<p className="description">
							Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
						</p>

						<img width="400" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="editor-image"/>

					</div>
			</div>

		</PrimaryLayout>
	)
}

export default ReadNoteScreen;