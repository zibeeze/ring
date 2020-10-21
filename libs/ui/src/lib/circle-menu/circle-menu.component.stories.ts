import { CircleMenuComponent } from './circle-menu.component';
import { boolean, number, object } from '@storybook/addon-knobs';
export default {
  title: 'CircleMenuComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: CircleMenuComponent,
  props: {
    items: object('items', [
      { label: 'One' },
      { label: 'Two' },
      { label: 'Three' },
      { label: 'Four' },
      { label: 'Five' },
      // { label: 'Six' },
      // { label: 'Seven' },
    ]),
    open: boolean('open', true),
    selected: number('selected', 0),
  },
});
