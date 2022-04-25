import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('cm-block/cm-cpt-items', {
	edit: Edit,
	save,
});
