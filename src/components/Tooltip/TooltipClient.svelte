<script>
  import { BitsConfig, Tooltip as BitsTooltip } from "bits-ui";
  import Tooltip from "../../components/Tooltip/Tooltip.svelte";
</script>

<BitsConfig>
  <BitsTooltip.Provider>
    <Tooltip />
  </BitsTooltip.Provider>
</BitsConfig>
