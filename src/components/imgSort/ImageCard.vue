<script setup>
import { ref } from "vue";
import useUtils from "src/composables/utils";

defineProps({
  content: {},
});

const { notify } = useUtils();

const isDeleteDialogOpen = ref(false);
const deleteImage = () => {
  console.log("delete image...");
  isDeleteDialogOpen.value = false;
  notify("Bild wurde erfolgreich gelöscht");
};

const isDialogOpen = ref(false);
const newReferenceBarcode = ref("");
const referenceBarcodeInput = ref(null);

const onNewReferenceBarcodeSubmit = async (e) => {
  const isValid = await referenceBarcodeInput.value.validate(
    newReferenceBarcode.value
  );
  if (isValid) {
    console.log("handle..", newReferenceBarcode.value);

    isDialogOpen.value = false;
    referenceBarcodeInput.value.resetValidation();
    newReferenceBarcode.value = "";

    notify("Referenze Barcode wurde erstellt.");
  }
};
</script>

<template>
  <q-card flat bordered>
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="max-width: 400px">
        <q-card-section>
          <div class="text-h6">Diesem Bild ein Referenz Barcode zuweisen</div>
          <div class="text-caption">
            Bilder die am selben Tag und innerhalb der Zeitgrenze gemacht wurden
            werden sich an diesem Bild orientieren.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model.trim="newReferenceBarcode"
            label="Referenz Barcode"
            autofocus
            filled
            ref="referenceBarcodeInput"
            type="text"
            @keyup.enter="onNewReferenceBarcodeSubmit"
            :rules="[
              (val) => val.length > 0 || 'Darf nicht leer sein',
              (val) =>
                val.match(/^\S+$/) ||
                'Leerzeichen sind im Barcode nicht erlaubt',
            ]"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Abbrechen" v-close-popup />
          <q-btn
            flat
            label="Speichern"
            type="submit"
            color="primary"
            @click="onNewReferenceBarcodeSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDeleteDialogOpen" persistent>
      <q-card style="max-width: 400px">
        <q-card-section>
          <div class="text-subtitle1">
            Bist du sicher das du dieses Bild entgültig löschen möchtest?
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Abbrechen" v-close-popup />
          <q-btn
            flat
            label="Löschen"
            type="submit"
            color="negative"
            @click="deleteImage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-menu anchor="bottom left" self="top left" context-menu>
      <q-item clickable>
        <q-item-section>In Gruppe verschieben</q-item-section>
        <q-item-section side>
          <q-icon name="mdi-chevron-right" />
        </q-item-section>

        <q-menu anchor="top end" self="top start" auto-close>
          <q-list>
            <template v-for="n in 23" :key="n">
              <q-item clickable>
                <q-item-section side>
                  <q-icon name="mdi-folder" size="xs" />
                </q-item-section>
                <q-item-section>{{ `N${n + 1}56` }}</q-item-section>
              </q-item>
              <q-separator />
            </template>
            <q-separator />
          </q-list>
        </q-menu>
      </q-item>

      <q-separator />

      <q-item clickable>
        <q-item-section>Erweiterte Optionen</q-item-section>
        <q-item-section side>
          <q-icon name="mdi-chevron-right" />
        </q-item-section>

        <q-menu anchor="top end" self="top start" auto-close>
          <q-list>
            <q-item clickable @click="isDialogOpen = true">
              <q-item-section>Referenz Barcode festlegen</q-item-section>
            </q-item>
            <q-separator />

            <q-item
              clickable
              class="text-negative"
              @click="isDeleteDialogOpen = true"
            >
              <q-item-section>Bild löschen</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
    </q-menu>

    <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

    <q-item>
      <q-item-section>
        <q-item-label>GOPRO65231</q-item-label>
        <q-item-label caption>24.06.22 16:41</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style scoped></style>
