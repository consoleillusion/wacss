import base from "../components/Base/schema";
import button from "../components/Button/schema";
import field from "../components/Field/schema";
import form from "../components/Form/schema";
import table from "../components/Table/schema";
import card from "../components/Card/schema";
import nav from "../components/Nav/schema";
import disclosure from "../components/Disclosure/schema";
import badge from "../components/Badge/schema";
import dialog from "../components/Dialog/schema";
import select from "../components/Select/schema";
import popover from "../components/Popover/schema";
import tooltip from "../components/Tooltip/schema";
import tabs from "../components/Tabs/schema";
import dropdownMenu from "../components/DropdownMenu/schema";
import toggle from "../components/Toggle/schema";
import switchSchema from "../components/Switch/schema";
import checkbox from "../components/Checkbox/schema";
import radioGroup from "../components/RadioGroup/schema";
import separator from "../components/Separator/schema";
import label from "../components/Label/schema";
import accordion from "../components/Accordion/schema";
import alertDialog from "../components/AlertDialog/schema";
import contextMenu from "../components/ContextMenu/schema";
import slider from "../components/Slider/schema";
import progress from "../components/Progress/schema";
import meter from "../components/Meter/schema";
import avatar from "../components/Avatar/schema";
import aspectRatio from "../components/AspectRatio/schema";

export const schemas = {
  base,
  button,
  field,
  form,
  table,
  card,
  nav,
  disclosure,
  badge,
  dialog,
  select,
  popover,
  tooltip,
  tabs,
  dropdownMenu,
  toggle,
  switch: switchSchema,
  checkbox,
  radioGroup,
  separator,
  label,
  accordion,
  alertDialog,
  contextMenu,
  slider,
  progress,
  meter,
  avatar,
  aspectRatio,
};
export { base, button, field, form, table, card, nav, disclosure, badge, dialog, select, popover, tooltip, tabs, dropdownMenu, toggle, switchSchema as switch, checkbox, radioGroup, separator, label, accordion, alertDialog, contextMenu, slider, progress, meter, avatar, aspectRatio };
export default schemas;
