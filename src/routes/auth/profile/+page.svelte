<script>
    import {signOut} from "@auth/sveltekit/client";
    import {page} from "$app/stores";
</script>

<h1>Profile page</h1>
{#if $page.data.session}
    {#if $page.data.session.user?.image}
        <span
                style="background-image: url('{$page.data.session.user.image}')"
                class="avatar"
        />
    {/if}
    <span class="signedInText">
        <small>Signed in as</small><br/>
        <strong>{$page.data.session.user?.name ?? "User"}</strong>
      </span>
    <div>
        {#if $page.data.session.user}
            {$page.data.session.user["roles"]}

        {/if}
    </div>
    <button on:click={() => signOut()} class="button">Sign out</button>
{/if}