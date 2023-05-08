import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from './Contact';

describe('Contact', () => {
    const props = {
      id: "1",
      username: 'John Doe',
      onClick: vi.fn(),
      selected: false,
      online: true,
    };
    
    beforeEach(() => {
      props.onClick.mockClear();
    });
  
    it('should render contact component', () => {
      render(<Contact {...props} />);  
      expect(screen.getByText(props.username)).toBeInTheDocument();
    });
  
    it('should invoke onClick handler when clicked', async () => {
      render(<Contact {...props} />);
      userEvent.click(screen.getByTestId('contact-container'));
      await waitFor(() => expect(props.onClick).toHaveBeenCalledTimes(1));
      expect(props.onClick).toHaveBeenCalledWith(props.id);
    });

    it('should show online status', () => {
        render(<Contact {...props} />);
    
        expect(screen.queryByTestId('selected-decorator')).not.toBeInTheDocument();
      });
  
    it('should show offline status', () => {
      const newProps = { ...props, selected: true };
      render(<Contact {...newProps} />);
  
      expect(screen.queryByTestId('selected-decorator')).toBeInTheDocument();
    });
  });