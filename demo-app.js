// JS-mounted demo bootstrapper (camelCase-friendly)
(function () {
  const WAIT_TIMEOUT = 5000;
  const POLL_INTERVAL = 100;

  function waitFor(conditionFn, timeout = WAIT_TIMEOUT) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      (function poll() {
        try {
          if (conditionFn()) return resolve();
        } catch (e) {}
        if (Date.now() - start > timeout) return reject(new Error('waitFor timeout'));
        setTimeout(poll, POLL_INTERVAL);
      })();
    });
  }

  async function boot() {
    try {
      if (document.readyState === 'loading') {
        await new Promise(r => document.addEventListener('DOMContentLoaded', r, { once: true }));
      }

      await waitFor(() => window.Vue && window.EspFrameworkUiComponents, WAIT_TIMEOUT);

      if (window.__ESP_UI_APP__) return;

      const { createApp } = window.Vue;
      const exported = window.EspFrameworkUiComponents;
      if (!createApp || !exported) throw new Error('Vue or UMD not available');

      const template = `
<div class="container-fluid p-4">
  <BsMenuBar
    :menuItems="menuItems"
    :mdns="mdns"
    :configChanged="configChanged"
    :currentRoute="currentRoute"
    v-model:darkMode="darkMode"
    @update:darkMode="handleDarkModeUpdate"
    brand="ESP Demo"
    @item-clicked="handleMenuClick"
  ></BsMenuBar>

  <h1 class="mb-4">ESP Framework UI Components Demo</h1>

  <!-- Icons Section -->
  <section class="mb-5">
    <h2>Icons</h2>
    <div class="row">
      <div class="col-md-3 mb-3" v-for="icon in icons" :key="icon">
        <div class="card p-3">
          <h5>{{ icon }}</h5>
          <component :is="icon" size="32" class="text-primary"></component>
        </div>
      </div>
    </div>
  </section>

  <!-- Input Components Section -->
  <section class="mb-5">
    <h2>Input Components</h2>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputText</h5>
          <BsInputText v-model="inputText" label="Text Input" placeholder="Enter some text" help="This is a basic text input"></BsInputText>
          <p class="mt-2">Value: {{ inputText }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputNumber</h5>
          <BsInputNumber v-model="inputNumber" label="Number Input" :min="0" :max="100" step="0.5" help="Enter a number between 0 and 100"></BsInputNumber>
          <p class="mt-2">Value: {{ inputNumber }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputTextArea</h5>
          <BsInputTextArea v-model="inputTextArea" label="Text Area" placeholder="Enter multiple lines of text" :rows="3" help="This supports multiple lines"></BsInputTextArea>
          <p class="mt-2">Value: {{ inputTextArea }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputTextAreaFormat</h5>
          <BsInputTextAreaFormat v-model="inputTextAreaFormat" label="Formatted Text Area" placeholder="Enter formatted text" :rows="3" help="Supports formatting"></BsInputTextAreaFormat>
          <p class="mt-2">Value: {{ inputTextAreaFormat }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputSwitch</h5>
          <BsInputSwitch v-model="inputSwitch" label="Toggle Switch" help="Click to toggle on/off"></BsInputSwitch>
          <p class="mt-2">Value: {{ inputSwitch }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputRadio</h5>
          <BsInputRadio v-model="inputRadio" label="Radio Options" :options="radioOptions" help="Select one option"></BsInputRadio>
          <p class="mt-2">Selected: {{ inputRadio }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsInputReadonly</h5>
          <BsInputReadonly v-model="inputReadonly" label="Read-only Input" help="This field is read-only"></BsInputReadonly>
          <p class="mt-2">Value: {{ inputReadonly }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsSelect</h5>
          <BsSelect v-model="selectValue" label="Select Dropdown" :options="selectOptions" help="Choose from the dropdown"></BsSelect>
          <p class="mt-2">Selected: {{ selectValue }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Other Components Section -->
  <section class="mb-5">
    <h2>Other Components</h2>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsCard</h5>
          <BsCard title="Sample Card" body="This is a sample card component">
            <template #footer>
              <button class="btn btn-primary">Action</button>
            </template>
          </BsCard>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsProgress</h5>
          <BsProgress :progress="progressValue"></BsProgress>
          <div class="mt-2">Progress: {{ progressValue }}%</div>
          <button type="button" class="btn btn-sm btn-outline-primary mt-2" @click.prevent.stop="incrementProgress">Increment</button>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsFileUpload</h5>
          <BsFileUpload label="Upload File" accept=".txt,.json" help="Select a text or JSON file" @file-selected="handleFileSelect"></BsFileUpload>
          <p class="mt-2">Selected file: {{ selectedFile?.name || 'None' }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsDropdown</h5>
          <BsDropdown :options="dropdownItems" button="Actions" :callback="handleDropdownSelect"></BsDropdown>
          <p class="mt-2">Last selected: {{ lastDropdownSelect }}</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsMessage - Supported Alert Types</h5>
          <BsMessage alert="success">This is a success alert message</BsMessage>
          <BsMessage alert="danger">This is a danger alert message</BsMessage>
          <BsMessage alert="warning">This is a warning alert message</BsMessage>
          <BsMessage alert="info">This is an info alert message</BsMessage>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal Components Section -->
  <section class="mb-5">
    <h2>Modal Components</h2>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsModal</h5>
          <BsModal button="Open Modal" title="Sample Modal" :model="'This is the content of the modal.'">
            <template #footer>
              <button class="btn btn-secondary">Close</button>
              <button class="btn btn-primary">Save</button>
            </template>
          </BsModal>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <h5>BsModalConfirm</h5>
          <BsModalConfirm id="demo-confirm" :callback="handleConfirm" title="Confirm Action" message="Are you sure you want to proceed?" confirm-text="Yes, proceed" cancel-text="Cancel"></BsModalConfirm>
          <button class="btn btn-warning" @click="openConfirm">Open Confirm Modal</button>
          <p class="mt-2">Confirmed: {{ confirmResult }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <section class="mb-5">
    <h2>BsFooter</h2>
    <BsFooter>
      <p>&copy; 2025 ESP Framework. All rights reserved.</p>
    </BsFooter>
  </section>
</div>
  `;

      const app = createApp({
        template,
        data() {
          return {
            icons: [
              'IconCheckCircle',
              'IconCloudUpArrow',
              'IconCpu',
              'IconExclamationTriangle',
              'IconEye',
              'IconEyeSlash',
              'IconGraphUpArrow',
              'IconHome',
              'IconInfoCircle',
              'IconTools',
              'IconUpArrow',
              'IconWifi',
              'IconXCircle',
            ],
            inputText: 'Hello World',
            inputTextArea: '',
            inputTextAreaFormat: '',
            inputNumber: 42.5,
            inputSwitch: false,
            inputRadio: null,
            radioOptions: [
              { label: 'Option A', value: 'A' },
              { label: 'Option B', value: 'B' },
            ],
            inputReadonly: 'Read-only sample',
            selectValue: null,
            selectOptions: [
              { label: 'One', value: 'one' },
              { label: 'Two', value: 'two' },
            ],
            dropdownItems: [
              { label: 'Reload', value: 'reload' },
              { label: 'Settings', value: 'settings' },
            ],
            progressValue: 75,
            confirmResult: null,
            mdns: 'esp-demo.local',
            configChanged: false,
            currentRoute: '/',
            darkMode: false,
            menuItems: [
              { label: 'Home', icon: 'IconHome', path: '/' },
              {
                label: 'Device',
                icon: 'IconCpu',
                path: '/device',
                badge: 2,
                subs: [{ label: 'Settings', path: '/device/settings', badge: 1 }],
              },
            ],
            lastMenuClick: null,
            lastDropdownSelect: null,
            selectedFile: null,
          };
        },
        methods: {
          handleMenuClick(item) {
            this.currentRoute = item.path || this.currentRoute;
            this.lastMenuClick = item.label || item.path || null;
            console.log('Menu clicked', item);
          },
          incrementProgress() {
            this.progressValue = (Number(this.progressValue) + 10) % 100;
          },
          handleConfirm(res) {
            this.confirmResult = res;
          },
          openConfirm() {
            const btn = document.getElementById('demo-confirm');
            if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          },
          handleDarkModeUpdate(val) {
            this.darkMode = !!val;
            this.configChanged = this.darkMode;
          },
          handleDropdownSelect(value) {
            if (value && typeof value === 'object')
              this.lastDropdownSelect = value.label || JSON.stringify(value);
            else this.lastDropdownSelect = value;
          },
          handleFileSelect(file) {
            this.selectedFile = file;
          },
        },
      });

      // Register components exported by the UMD bundle (PascalCase)
      Object.entries(exported).forEach(([name, comp]) => {
        try {
          if (!comp) return;
          app.component(name, comp);
        } catch (e) {
          console.warn('register failed', name, e);
        }
      });

      // RouterLink stub
      app.component('RouterLink', {
        props: ['to', 'disabled'],
        emits: ['click'],
        template: '<a :href="to" @click.prevent="$emit(\'click\')"><slot></slot></a>',
      });

      app.mount('#app-root');
      window.__ESP_UI_APP__ = true;
      console.info('ESP demo mounted (JS template, camelCase)');
    } catch (err) {
      console.error('Failed to boot demo', err);
    }
  }

  boot();
})();
