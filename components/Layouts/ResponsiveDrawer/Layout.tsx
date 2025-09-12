import { children, For, JSX, Show, splitProps } from "solid-js";
import { useKeybinding } from "../../../utilities/useKeybinding";
import "./style.css";

export const CheckboxId = {
  NAVBAR: "navbar-toggle_YSiT75H2",
  SIDEBAR: "sidebar-toggle_O7wbLo2S",
  BOTTOM: "bottom-toggle_gU3UjReQ",
  BOTTOM_DESKTOP: "bottom-desktop-toggle_nWpPhkQr",
  RIGHT_DRAWER: "right-drawer-toggle_kIMyHA4g",
};

type CheckboxIdType = (typeof CheckboxId)[keyof typeof CheckboxId];

const InputLayout = (props: { id: CheckboxIdType }) => {
  return <input type="checkbox" id={props.id} class="sr-only_iKj3qpqk" />;
};
export const Layout = (props: JSX.IntrinsicElements["div"] & {
  enableKeyboardShortcuts?: boolean;
}) => {
  const [local, others] = splitProps(props, ["children", "class", "enableKeyboardShortcuts"]);
  const cls = `layout_wJwQgiMd ${local.class || ''}`.trim();
  const safeChildren = children(() => local.children);

  // Helper function to toggle checkbox state
  const toggleCheckbox = (checkboxId: CheckboxIdType) => {
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  };

  // Set up keyboard shortcuts if enabled (default: true)
  if (local.enableKeyboardShortcuts !== false) {
    // Toggle sidebar: Ctrl+B (like VS Code)
    useKeybinding(
      { key: "b", ctrl: true },
      () => toggleCheckbox(CheckboxId.SIDEBAR)
    );

    // Toggle right drawer: Ctrl+Shift+P (like command palette)
    useKeybinding(
      { key: "p", ctrl: true, shift: true },
      () => toggleCheckbox(CheckboxId.RIGHT_DRAWER)
    );

    // Toggle navbar: Ctrl+Shift+N
    useKeybinding(
      { key: "n", ctrl: true, shift: true },
      () => toggleCheckbox(CheckboxId.NAVBAR)
    );

    // Toggle bottom dock: Ctrl+J (like VS Code terminal)
    useKeybinding(
      { key: "j", ctrl: true },
      () => toggleCheckbox(CheckboxId.BOTTOM)
    );

    // Toggle bottom dock (desktop): Ctrl+Shift+J
    useKeybinding(
      { key: "j", ctrl: true, shift: true },
      () => toggleCheckbox(CheckboxId.BOTTOM_DESKTOP)
    );
  }

  return (
    <div {...others} class={cls}>
      <For each={Object.values(CheckboxId)}>
        {(id) => <InputLayout id={id} />}
      </For>
      {safeChildren()}
    </div>
  );
};

/**
 * ToggleButton component that creates a label element linked to a checkbox input.
 * @param props.id - The id of the input element which is placed in the 'for' prop of the label
 * @param props.devStyle - Optional boolean to enable development styling and display the id
 * @param props.children - Child elements to render inside the label
 * @param props.class - CSS class names to apply to the label
 */
export const ToggleButton = (
  props: JSX.IntrinsicElements["label"] & {
    id: CheckboxIdType;
    devStyle?: boolean;
  },
) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  let cls = `${local.class} ${(props.devStyle && "toggle-btn_uAsbNe3G") || ""}`;
  const safeChildren = children(() => local.children);
  return (
    <label {...others} for={props.id} class={cls}>
      <Show when={props.devStyle}>{props.id}</Show>
      {safeChildren()}
    </label>
  );
};

export const Navbar = (props: JSX.IntrinsicElements["header"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `navbar_5CmwKoaj ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <header {...others} class={cls}>
      {safeChildren()}
    </header>
  );
};

export const MainWrapper = (props: JSX.IntrinsicElements["main"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `main-wrapper_3eSqDsNH ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <main {...others} class={cls}>
      <label for={CheckboxId.SIDEBAR} class="overlay_g8Z82nUf left-overlay_LHPeXu4H"></label>
      <label
        for={CheckboxId.RIGHT_DRAWER}
        class="overlay right-overlay_IZyMDE88"
      ></label>
      {safeChildren()}
    </main>
  );
};

export const Sidebar = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `sidebar_7doPVoW4 ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <aside {...others} class={cls}>
      {safeChildren()}

      <div class="resize-handle_rj5Mm6Gp">
        <div class="resize-grip_i8KDTvH0"></div>
      </div>
    </aside>
  );
};

export const SidebarContent = (props: JSX.IntrinsicElements["div"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `sidebar-content_hohhjVux ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <div {...others} class={cls}>
      {safeChildren()}
    </div>
  );
};

export const RightDrawer = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `right-drawer_oZdA3TkV ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <aside {...others} class={cls}>
      {safeChildren()}
    </aside>
  );
};

export const BottomDock = (props: JSX.IntrinsicElements["footer"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `bottom-dash_PFrRGaJ9 ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <footer {...others} class={cls}>
      {safeChildren()}
    </footer>
  );
};

export const MainContent = (props: JSX.IntrinsicElements["section"]) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const cls = `main-content_qWHMxQ3G ${local.class}`;
  const safeChildren = children(() => local.children);
  return (
    <section {...others} class={cls}>
      {safeChildren()}
    </section>
  );
};

/**
 * Component to display available keyboard shortcuts
 */
export const KeyboardShortcuts = () => {
  const shortcuts = [
    { keys: "Ctrl + B", description: "Toggle Sidebar" },
    { keys: "Ctrl + Shift + P", description: "Toggle Right Drawer" },
    { keys: "Ctrl + Shift + N", description: "Toggle Navbar" },
    { keys: "Ctrl + J", description: "Toggle Bottom Dock" },
    { keys: "Ctrl + Shift + J", description: "Toggle Bottom Dock (Desktop)" },
  ];

  return (
    <div class="keyboard-shortcuts">
      <h3>Keyboard Shortcuts</h3>
      <div class="shortcuts-list">
        <For each={shortcuts}>
          {(shortcut) => (
            <div class="shortcut-item">
              <code class="shortcut-keys">{shortcut.keys}</code>
              <span class="shortcut-description">{shortcut.description}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export const UnstyledExample = () => (
  <Layout style="background: var(--bg-color); color: var(--content-color)">
    <Navbar>
      <h1>App Name</h1>
    </Navbar>
    <MainWrapper>
      <Sidebar>
        <SidebarContent>
          <nav>
            <For each={Array.from({ length: 200 }, (_, i) => i + 1)}>
              {(item) => (
                <div>
                  <a href={`#item-${item}`}>Item {item}</a>
                </div>
              )}
            </For>
          </nav>
        </SidebarContent>
      </Sidebar>
      <MainContent>
        <div class="center">
          <h1>Main Content</h1>
          <p>This is the main content area.</p>

          <div>
            <For each={Object.values(CheckboxId)}>
              {(id) => <ToggleButton id={id} devStyle={true} />}
            </For>
          </div>
        </div>
      </MainContent>
      <RightDrawer />
    </MainWrapper>
    <BottomDock>
      <p>Bottom Dashboard</p>
    </BottomDock>
  </Layout>
);
