use anchor_lang::prelude::*;

declare_id!("5ARgUBBoQMXhfDANvmCV2cWw3oBbes4dWhK28TmZG9wy");

#[program]
pub mod project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
