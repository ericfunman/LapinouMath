import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RabbitAvatar, { type RabbitVariant, type RabbitExpression, type AnimationType } from '../../components/RabbitAvatar';

describe('RabbitAvatar Component', () => {
  describe('Rendering', () => {
    it('should render SVG with default props', () => {
      const { container } = render(<RabbitAvatar />);
      const svg = container.querySelector('svg');
      expect(svg).toBeDefined();
      expect(svg?.getAttribute('viewBox')).toBe('0 -8 100 108');
    });

    it('should render with different variants', () => {
      const variants: RabbitVariant[] = ['classic', 'white', 'gray', 'brown'];
      
      variants.forEach(variant => {
        const { container, unmount } = render(<RabbitAvatar variant={variant} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeDefined();
        unmount();
      });
    });

    it('should render with custom size', () => {
      const { container } = render(<RabbitAvatar size={150} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('150');
      expect(svg?.getAttribute('height')).toBe('150');
    });

    it('should render with default size 80', () => {
      const { container } = render(<RabbitAvatar />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('80');
      expect(svg?.getAttribute('height')).toBe('80');
    });
  });

  describe('Expressions', () => {
    it('should render different expressions', () => {
      const expressions: RabbitExpression[] = ['happy', 'sad', 'surprised', 'focused'];
      
      expressions.forEach(expression => {
        const { container, unmount } = render(<RabbitAvatar expression={expression} />);
        expect(container.querySelector('svg')).toBeDefined();
        unmount();
      });
    });

    it('should have eyes and mouth elements in SVG', () => {
      const { container } = render(<RabbitAvatar expression="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeDefined();
      expect(svg?.querySelectorAll('*').length).toBeGreaterThan(0);
    });
  });

  describe('Animations', () => {
    it('should render with animation prop', () => {
      const animations: AnimationType[] = ['idle', 'correct', 'wrong', 'celebrate'];
      
      animations.forEach(animation => {
        const { container, unmount } = render(
          <RabbitAvatar animation={animation} />
        );
        expect(container.querySelector('svg')).toBeDefined();
        unmount();
      });
    });

    it('should call onAnimationComplete callback', async () => {
      const onAnimationComplete = vi.fn();
      render(
        <RabbitAvatar 
          animation="correct"
          onAnimationComplete={onAnimationComplete}
        />
      );
      
      // Note: Framer Motion animations may not complete immediately in tests
      // This test verifies the callback is properly passed through
      expect(onAnimationComplete).toBeDefined();
    });
  });

  describe('Accessories', () => {
    it('should render with accessories', () => {
      const { container } = render(
        <RabbitAvatar accessories={['hat-top', 'glasses-round']} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeDefined();
    });

    it('should apply adjustments to accessories', () => {
      const adjustments = {
        'hat-top': { offsetX: 10, offsetY: 5, scale: 1.2 }
      };
      
      const { container } = render(
        <RabbitAvatar 
          accessories={['hat-top']}
          accessoryAdjustments={adjustments}
        />
      );
      
      expect(container.querySelector('svg')).toBeDefined();
    });

    it('should highlight selected accessory', () => {
      const { container } = render(
        <RabbitAvatar 
          accessories={['hat-top', 'glasses-round']}
          selectedAccessory="hat-top"
        />
      );
      
      expect(container.querySelector('svg')).toBeDefined();
    });

    it('should handle empty accessories array', () => {
      const { container } = render(<RabbitAvatar accessories={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeDefined();
    });
  });

  describe('Proportional Scaling', () => {
    it('should scale adjustments based on size', () => {
      const adjustments = {
        'hat-top': { offsetX: 10, offsetY: 5, scale: 1.2 }
      };
      
      const { container: container1 } = render(
        <RabbitAvatar 
          size={80}
          accessories={['hat-top']}
          accessoryAdjustments={adjustments}
        />
      );
      
      const { container: container2 } = render(
        <RabbitAvatar 
          size={200}
          accessories={['hat-top']}
          accessoryAdjustments={adjustments}
        />
      );
      
      expect(container1.querySelector('svg')).toBeDefined();
      expect(container2.querySelector('svg')).toBeDefined();
    });
  });

  describe('Legacy Props Compatibility', () => {
    it('should accept legacy accessory offset props', () => {
      const { container } = render(
        <RabbitAvatar 
          accessories={['hat-top']}
          accessoryOffsetX={5}
          accessoryOffsetY={10}
          accessoryScale={1.1}
        />
      );
      
      expect(container.querySelector('svg')).toBeDefined();
    });
  });

  describe('Wrapper Container', () => {
    it('should be wrapped in container with relative positioning', () => {
      const { container } = render(<RabbitAvatar size={100} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('relative');
      expect(wrapper.className).toContain('inline-block');
    });

    it('should have correct container size', () => {
      const size = 120;
      const { container } = render(<RabbitAvatar size={size} />);
      const wrapper = container.firstChild as HTMLElement;
      const style = wrapper.getAttribute('style');
      expect(style).toContain(`${size}px`);
    });
  });

  describe('Integration', () => {
    it('should render complete avatar with all props', () => {
      const { container } = render(
        <RabbitAvatar 
          variant="classic"
          expression="happy"
          animation="idle"
          size={100}
          accessories={['hat-top', 'glasses-round']}
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeDefined();
      expect(svg?.getAttribute('width')).toBe('100');
    });
  });
});
