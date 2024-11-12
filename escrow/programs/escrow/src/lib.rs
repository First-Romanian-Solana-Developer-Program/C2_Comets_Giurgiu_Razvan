pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("942jjVcZfLHUxWXDteW8PM45zFnSZRi9UHCEiWBiyWxk");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }

    pub fn make_offer(
        ctx: Context<MakeOffer>,
        id: u64,
        token_mint_amount_a: u64,
        token_mint_amount_b: u64,
    ) -> Result<()> {
        make_offer::process(ctx, id, token_mint_amount_a, token_mint_amount_b)
    }

    pub fn take_offer(ctx: Context<TakeOffer>) -> Result<()> {
        take_offer::process(ctx)
    }
}
