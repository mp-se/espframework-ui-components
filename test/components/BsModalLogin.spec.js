import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import BsModalLogin from '../../src/components/BsModalLogin.vue';

// Mock the logger module
vi.mock('../../src/modules/logger.js', () => ({
  logDebug: vi.fn(),
}));

describe('BsModalLogin', () => {
  let wrapper;
  const mockCallback = vi.fn();

  beforeEach(() => {
    mockCallback.mockClear();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('mounts successfully', () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'test-modal',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders hidden button with correct id', () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'modal-login-btn',
      },
    });
    const button = wrapper.find('button[type="button"]');
    expect(button.exists()).toBe(true);
    expect(button.attributes('id')).toBe('modal-login-btn');
    expect(button.attributes('hidden')).toBeDefined();
  });

  it('renders modal with form elements', () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'test-modal',
      },
    });
    expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('displays modal title correctly', () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'test-modal',
      },
    });
    expect(wrapper.find('.modal-title').text()).toBe('Enter your admin password');
  });

  it('updates password input when user types', async () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'test-modal',
      },
    });
    const input = wrapper.find('input[type="password"]');
    await input.setValue('mypassword123');
    expect(input.element.value).toBe('mypassword123');
  });

  it('calls callback with password when confirm button is clicked', async () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'test-modal',
      },
    });
    const input = wrapper.find('input[type="password"]');
    await input.setValue('secretpass');

    const confirmButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Confirm'),
    );
    await confirmButton.trigger('click');
    await flushPromises();

    expect(mockCallback).toHaveBeenCalledWith('secretpass');
  });

  it('calls getElementById with correct id on mount', () => {
    const mockButton = { click: vi.fn() };
    const getElementByIdSpy = vi.fn(() => mockButton);
    document.getElementById = getElementByIdSpy;

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'my-test-id',
      },
    });

    expect(getElementByIdSpy).toHaveBeenCalledWith('my-test-id');
    expect(mockButton.click).toHaveBeenCalled();
  });

  it('has modal ID matching template', () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'custom-login-modal',
      },
    });
    expect(wrapper.find('.modal').attributes('id')).toBe('modalLogin');
  });

  it('has confirm button with btn-primary class', () => {
    const mockButton = { click: vi.fn() };
    document.getElementById = vi.fn(() => mockButton);

    wrapper = mount(BsModalLogin, {
      props: {
        callback: mockCallback,
        id: 'test-modal',
      },
    });
    const confirmButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Confirm'),
    );
    expect(confirmButton.classes()).toContain('btn-primary');
  });
});
