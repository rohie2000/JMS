// Vollständiger Bestand der vier verwendeten Zeichengruppen aus dem Ordner "Bilder".
const signFiles = [
  "Brandschutzzeichen_AA_Blanko.png", "Brandschutzzeichen_Brandmelder.png", "Brandschutzzeichen_Brandmeldetelefon.png",
  "Brandschutzzeichen_Feuerleiter.png", "Brandschutzzeichen_Feuerlöscher.png", "Brandschutzzeichen_Feuerlöscher_links.png",
  "Brandschutzzeichen_Feuerlöscher_rechts.png", "Brandschutzzeichen_Feuerwehraufzug.png", "Brandschutzzeichen_Löschschlauch.png",
  "Brandschutzzeichen_Mittel_Geräte_zur_Brandbekämpfung.png", "Brandschutzzeichen_Pfeil_links.png", "Brandschutzzeichen_Pfeil_links_oben.png",
  "Gebotszeichen_allgemeines_Gebotszeichen.png", "Gebotszeichen_Anleitung_beachten.png", "Gebotszeichen_Atemschutz_benutzen.png",
  "Gebotszeichen_Auffanggurt_benutzen.png", "Gebotszeichen_Augenschutz_benutzen.png", "Gebotszeichen_Fußgängerweg_benutzen.png",
  "Gebotszeichen_Fußschutz_benutzen.png", "Gebotszeichen_Gehörschutz_benutzen.png", "Gebotszeichen_Gesichtsschutz_benutzen.png",
  "Gebotszeichen_Haargummi_tragen.png", "Gebotszeichen_Hände_desinfizieren.png", "Gebotszeichen_Hände_waschen.png",
  "Gebotszeichen_Handlauf_benutzen.png", "Gebotszeichen_Handschutz_benutzen.png", "Gebotszeichen_Hautschutzmittel_benutzen.png",
  "Gebotszeichen_Kopfhaube_tragen.png", "Gebotszeichen_Kopfschutz_benutzen.png", "Gebotszeichen_Maske_benutzen.png",
  "Gebotszeichen_Netzstecker_ziehen.png", "Gebotszeichen_Rückhaltesystem_benutzen.png", "Gebotszeichen_Schutzhaube_tragen.png",
  "Gebotszeichen_Schutzkleidung_benutzen.jpg", "Gebotszeichen_Schutzkleidung_benutzen.png", "Gebotszeichen_Schutzschürze_benutzen.png",
  "Gebotszeichen_Schweißmaske_benutzen.png", "Gebotszeichen_Übergang_benutzen.png", "Gebotszeichen_vor_Benutzung_erden.png",
  "Gebotszeichen_vor_Wartung_oder_Reparatur_freischalten.png", "Gebotszeichen_Warnweste_benutzen.png",
  "Rettungszeichen_AED.png", "Rettungszeichen_Arzt.png", "Rettungszeichen_Augenspüleinrichtung.png", "Rettungszeichen_Erste_Hilfe.png",
  "Rettungszeichen_Krankentrage.png", "Rettungszeichen_Medizintasche.png", "Rettungszeichen_Noatausschalter.png",
  "Rettungszeichen_Notausgang_links.png", "Rettungszeichen_Notausgang_links_2.png", "Rettungszeichen_Notausgang_rechts.png",
  "Rettungszeichen_Notausgang_rechts_2.png", "Rettungszeichen_Notausgangsvorrichtung.png", "Rettungszeichen_Notausstieg_mit_Fluchtleiter.png",
  "Rettungszeichen_Notdusche.png", "Rettungszeichen_Nottelefon.png", "Rettungszeichen_öffnet_linksdrehend.png",
  "Rettungszeichen_öffnet_rechtsdrehend.png", "Rettungszeichen_Pfeil_links.png", "Rettungszeichen_Pfeil_links_oben.png",
  "Rettungszeichen_Pfeil_links_unten.png", "Rettungszeichen_Pfeil_oben.png", "Rettungszeichen_Pfeil_rechts.png",
  "Rettungszeichen_Pfeil_rechts_oben.png", "Rettungszeichen_Pfeil_rechts_unten.png", "Rettungszeichen_Pfeil_unten.png",
  "Rettungszeichen_Rettungsausstieg.png", "Rettungszeichen_Rettungsring.png", "Rettungszeichen_Rettungsstuhl.png",
  "Rettungszeichen_Rettungsstuhl_temp.png", "Rettungszeichen_Rettungsweste.png", "Rettungszeichen_Sammelstelle.png",
  "Rettungszeichen_Trinkwasser.png", "Rettungszeichen_Vorläufige_Evakuierungsstelle.png",
  "Warnung_AA_Spass_01.png", "Warnung_AA_Spass_02.png", "Warnung_AA_Spass_03.png", "Warnung_AA_Spass_04.png", "Warnung_AA_Spass_05.png",
  "Warnung_allgemein.jpg", "Warnung_allgemein.png", "Warnung_vor_Absturzgefahr.png", "Warnung_vor_aetzenden_Stoffen.png",
  "Warnung_vor_automatischem_Anlauf.jpg", "Warnung_vor_automatischem_Anlauf.png", "Warnung_vor_Biogefährdung.png",
  "Warnung_vor_brandfoerdernden_Stoffen.png", "Warnung_vor_dem_Wachhund.png", "Warnung_vor_elektrischer_Spannung.png",
  "Warnung_vor_explosionsgefährlichen_Stoffen.png", "Warnung_vor_feuergefaehrlichen_Stoffen.png", "Warnung_vor_Flurfoerderzeugen.png",
  "Warnung_vor_Gasflaschen.png", "Warnung_vor_Gefahren_durch_das_Aufladen_von_Batterien.png",
  "Warnung_vor_gegenlauufigen_Rollen.png", "Warnung_vor_giftigen_Stoffen.png", "Warnung_vor_Handverletzungen.png",
  "Warnung_vor_heisser_Oberflaeche.png", "Warnung_vor_Hindernissen_am_Boden.png", "Warnung_vor_Hindernissen_im_Kopfbereich.png",
  "Warnung_vor_Laserstrahlen.png", "Warnung_vor_magnetischem_Feld.png", "Warnung_vor_nichtionisierender_Strahlung.png",
  "Warnung_vor_niedriger_Temperatur_Frost.png", "Warnung_vor_optischer_Strahlung.png", "Warnung_vor_Quetschgefahr.png",
  "Warnung_vor_radioaktiven_Stoffen_oder_ionisierender_Strahlung.png", "Warnung_vor_Rutschgefahr.png",
  "Warnung_vor_schwebender_Last.png", "Warnung_vor_spitzem_Gegenstand.png"
];

function signFromFile(file) {
  const definitions = [
    ["Gebotszeichen_", "gebot"], ["Rettungszeichen_", "rettung"],
    ["Brandschutzzeichen_", "brand"], ["Warnung_", "warnung"]
  ];
  const [prefix, group] = definitions.find(([candidate]) => file.startsWith(candidate));
  let name = file.slice(prefix.length).replace(/\.(png|jpg)$/i, "").replaceAll("_", " ")
    .replace(/\bAA Blanko\b/, "Allgemeines Brandschutzzeichen")
    .replace(/\bAA Spass (\d+)\b/, "Übungs-Warnzeichen $1")
    .replace(/\bNoatausschalter\b/, "Notausschalter")
    .replace(/\baetzenden\b/, "ätzenden").replace(/\bbrandfoerdernden\b/, "brandfördernden")
    .replace(/\bfeuergefaehrlichen\b/, "feuergefährlichen").replace(/\bgegenlauufigen\b/, "gegenläufigen")
    .replace(/\bheisser\b/, "heißer").replace(/\bOberflaeche\b/, "Oberfläche")
    .replace(/\btemp\b/, "Variante").replace(/\b2\b$/, "Variante 2");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const lowerName = name.charAt(0).toLowerCase() + name.slice(1);
  const meaning = {
    gebot: `Du sollst: ${lowerName}.`,
    rettung: `Dieses Rettungszeichen zeigt: ${name}.`,
    brand: `Dieses Brandschutzzeichen zeigt: ${name}.`,
    warnung: name.startsWith("Vor ") ? `Achtung! Dieses Zeichen warnt ${lowerName}.` : `Achtung! ${name}.`
  }[group];
  return { id: file.toLowerCase(), name, group, file, meaning };
}

const signs = signFiles.map(signFromFile);
