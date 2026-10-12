-- Deposit rules from the website FAQ: tattoos 500–1000 kr, non-refundable, moved if rescheduled 48 h ahead.
-- Tattoo requests start at 500 kr; staff raise it for bigger pieces when confirming.
UPDATE services SET deposit_ore = 50000 WHERE kind = 'tattoo' AND deposit_ore = 0;
