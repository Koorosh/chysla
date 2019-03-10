all: ukr.json
clean:
	rm -rf -- build

# TODO: Simplify map

# 1-states build - START
build/ukr_admbnda_adm1_q2_sspe_20171221.zip:
	mkdir -p $(dir $@)
	curl -o $@ https://data.humdata.org/dataset/a0a40fba-5ca6-4a1e-a9a7-73a7c750a454/resource/fb91cd56-de05-4365-bbfe-7c551961132c/download/$(notdir $@)

build/ukr_admbnda_adm1_q2_sspe_20171221.shp: build/ukr_admbnda_adm1_q2_sspe_20171221.zip
	unzip -od $(dir $@) $<
	touch $@

build/ukr_admbnda_adm1_q2_sspe_20171221_cleaned.shp: build/ukr_admbnda_adm1_q2_sspe_20171221.shp
	ogr2ogr \
	  -lco ENCODING=UTF-8 \
	  -overwrite \
      -sql "SELECT 1 AS TYPE, ADM1_PCODE as ID, ADM1_EN, ADM1_UA, ADM1_PCODE, ADM0_EN, ADM0_UA, ADM0_PCODE, adm1Type, adm1Clas FROM $(basename $(notdir $<) .shp)" \
	  $@ \
	  $<

build/states.json: build/ukr_admbnda_adm1_q2_sspe_20171221_cleaned.shp
	ogr2ogr \
	  -f GeoJSON \
	  -overwrite \
	  -simplify 0.05 \
	  $@ \
	  $<
# 1-states build - END

# 2-regions-borders build - START
build/ukr_admbnda_adm2_q2_sspe_20171221.zip:
	mkdir -p $(dir $@)
	curl -o $@ https://data.humdata.org/dataset/a0a40fba-5ca6-4a1e-a9a7-73a7c750a454/resource/13057871-8303-4c2f-abb0-4db1a92e80b0/download/$(notdir $@)

build/ukr_admbnda_adm2_q2_sspe_20171221.shp: build/ukr_admbnda_adm2_q2_sspe_20171221.zip
	unzip -od $(dir $@) $<
	touch $@

build/ukr_admbnda_adm2_q2_sspe_20171221_cleaned.shp: build/ukr_admbnda_adm2_q2_sspe_20171221.shp
	ogr2ogr \
	  -lco ENCODING=UTF-8 \
	  -overwrite \
	  -sql "SELECT 2 as TYPE, ADM2_PCODE AS ID, ADM2_EN, ADM2_UA, ADM2_PCODE, ADM1_EN, ADM1_UA, ADM1_PCODE, ADM0_EN, ADM0_UA, ADM0_PCODE, adm2Clas, adm2Type FROM $(basename $(notdir $<) .shp)" \
	  $@ \
	  $<

build/regions-borders.json: build/ukr_admbnda_adm2_q2_sspe_20171221_cleaned.shp
	ogr2ogr \
	  -f GeoJSON \
	  -overwrite \
	  -simplify 0.05 \
	  $@ \
	  $<
# 2-regions-borders build - END

# 2-regions points build - START
build/ukr_admbndp_adm2_q2_sspe_itos_20171221.zip:
	mkdir -p $(dir $@)
	curl -o $@ https://data.humdata.org/dataset/a0a40fba-5ca6-4a1e-a9a7-73a7c750a454/resource/0a083a89-9053-4988-b67c-3ea3b6ae96ca/download/$(notdir $@)

build/ukr_admbndp_adm2_q2_sspe_itos_20171221.shp: build/ukr_admbndp_adm2_q2_sspe_itos_20171221.zip
	unzip -od $(dir $@) $<
	touch $@

build/ukr_admbndp_adm2_q2_sspe_itos_20171221_cleaned.shp: build/ukr_admbndp_adm2_q2_sspe_itos_20171221.shp
	ogr2ogr \
	  -lco ENCODING=UTF-8 \
	  -overwrite \
		-sql "SELECT 2 as TYPE, ADM2_PCODE AS ID, ADM2_EN, ADM2_UA, ADM2_PCODE, ADM1_EN, ADM1_UA, ADM1_PCODE, ADM0_EN, ADM0_UA, ADM0_PCODE, adm2Clas, adm2Type FROM $(basename $(notdir $<) .shp)" \
	  $@ \
	  $<

build/regions-points.json: build/ukr_admbndp_adm2_q2_sspe_itos_20171221_cleaned.shp
	ogr2ogr \
	  -f GeoJSON \
	  -overwrite \
	  -simplify 0.05 \
	  $@ \
	  $<
# 2-regions points build - END

# TopoJSON
ukr.json: build/states.json build/regions-borders.json build/regions-points.json
	geo2topo \
	  -o $(notdir $@) \
	  $?
