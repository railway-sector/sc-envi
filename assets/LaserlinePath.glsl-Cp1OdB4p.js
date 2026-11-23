import{eL as we,cN as De,a1 as p,a3 as x,a4 as O,hZ as xe,h_ as Ve,cZ as Le,cM as Se,M5 as Ee,Ms as Re,Mt as Ce,K8 as v,Ml as D,M9 as Me,K9 as W,K5 as l,ce as q,K0 as ee,M3 as Ae,K$ as C,dk as te,di as $,i7 as H,Mu as $e,i2 as ie,L6 as re,KF as M,gP as P,dh as y,Mv as se,Mw as ne,Bb as ae,y as f,mt as oe,qw as je,v3 as Te,dl as Oe,dx as le,f$ as ce,lT as Ue,Mx as Ge,zO as Ie,KD as Fe,Mg as ze,K4 as B,cq as qe,Kb as de,Kc as he,_ as ue,gT as Ne,ch as K,r0 as I,jV as pe,gS as fe,df as We,dj as U,oP as He,KS as Be,rJ as Ke,Me as ke,Kn as S,oS as Ze,oT as k,My as Xe,hp as Je,Mz as j,MA as Qe,u$ as Ye,xa as et,v0 as tt,v1 as it,v2 as rt,v4 as st,MB as nt,cj as Z}from"./index-BfFZtmsR.js";import{t as ge}from"./VisualElement-wezVCdLJ.js";class at{constructor(e){this._resourceFactory=e,this._resources=null,this._visible=!0,this._attached=!1,this._renderGroup=2}destroy(){this._destroyResources()}get resources(){return this._resources?.external}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this._syncGeometriesToRenderer())}get attached(){return this._attached}set attached(e){e!==this._attached&&(this._attached=e,this._createOrDestroyResources())}get renderGroup(){return this._renderGroup}set renderGroup(e){this._renderGroup=e;let i=this._resources?.layerView;i&&(i.renderGroup=e)}recreate(){this.attached&&this._createResources()}recreateGeometry(){if(!this._resourceFactory.recreateGeometry){this.recreate();return}this._resources!=null&&(this._ensureRenderGeometriesRemoved(),this._resourceFactory.recreateGeometry(this._resources.external),this._syncGeometriesToRenderer())}forEachMaterial(e){this._resources&&this._resourceFactory.forEachMaterial(this._resources.external,e)}_createOrDestroyResources(){this._attached?this._resources??this._createResources():this._destroyResources()}_createResources(){this._destroyResources();let e=this._resourceFactory.createResources(),i=new V({view:this._resourceFactory.view,renderGroup:this._renderGroup}),r=this._resourceFactory.view.overlayManager;this._resources={layerView:i,external:e,geometriesAdded:!1},this._resources.drapeSourceRenderer=r?.registerGeometryDrapeSource(i),this._syncGeometriesToRenderer()}_destroyResources(){this._resources!=null&&(this._ensureRenderGeometriesRemoved(),this._resourceFactory.view.overlayManager?.unregisterDrapeSource(this._resources.layerView),this._resourceFactory.destroyResources(this._resources.external),this._resources=null)}_syncGeometriesToRenderer(){this._visible?this._ensureRenderGeometriesAdded():this._ensureRenderGeometriesRemoved()}_ensureRenderGeometriesRemoved(){this._resources?.drapeSourceRenderer!=null&&this._resources.geometriesAdded&&(this._resources.drapeSourceRenderer.removeGeometries(this._resources.external.geometries,1),this._resources.geometriesAdded=!1)}_ensureRenderGeometriesAdded(){this._resources?.drapeSourceRenderer==null||this._resources.geometriesAdded||(this._resources.drapeSourceRenderer.addGeometries(this._resources.external.geometries,1),this._resources.geometriesAdded=!0)}}let V=class extends we(De){constructor(t){super(t),this.drapeSourceType=1,this.updatePolicy=1,this.renderGroup=2}};p([x({constructOnly:!0})],V.prototype,"view",void 0),p([x({readOnly:!0})],V.prototype,"drapeSourceType",void 0),p([x()],V.prototype,"renderGroup",void 0),V=p([O("esri.views.3d.interactive.visualElements.DrapedVisualElementResources")],V);class ot{constructor(e){this._resourceFactory=e,this._resources=null,this._visible=!0,this._attached=!1}destroy(){this._destroyResources()}get object(){return this._resources==null?null:this._resources.object}get resources(){return this._resources==null?null:this._resources.external}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this._syncVisible())}get attached(){return this._attached}set attached(e){e!==this._attached&&(this._attached=e,this._createOrDestroyResources())}recreate(){this.attached&&this._createResources()}recreateGeometry(){if(!this._resourceFactory.recreateGeometry){this.recreate();return}let e=this._resourceFactory.view.stage;if(this._resources==null||!e)return;let i=this._resources.object;i.removeAllGeometries(),this._resourceFactory.recreateGeometry(this._resources.external,i,this._resources.layer)}forEachMaterial(e){this._resources&&this._resourceFactory.forEachMaterial(this._resources.external,e)}_createOrDestroyResources(){this._attached?this._resources||this._createResources():this._destroyResources()}_createResources(){this._destroyResources();let e=this._resourceFactory,i=e.view,r=i.stage;if(!r)return;let a=new xe(r,{pickable:!1,updatePolicy:1}),o=new Ve({castShadow:!1}),u=e.createResources(o,a);a.add(o);let h=e.cameraChanged,d=h?Le(()=>i.state.camera,s=>h(s),Se):null;this._resources={layer:a,object:o,external:u,cameraHandle:d},this._syncVisible()}_destroyResources(){this._resources!=null&&(this._resources.layer.destroy(),this._resources.object.dispose(),this._resources.cameraHandle?.remove(),this._resourceFactory.destroyResources(this._resources.external),this._resources=null)}_syncVisible(){this._resources!=null&&(this._resources.object.visible=this._visible)}}let St=class extends ge{constructor(e){super(e),this._isDraped=!1,this.object3dResources=new ot(this.createObject3DResourceFactory(e.view)),this.drapedResources=new at(this.createDrapedResourceFactory(e.view)),this.isDraped=e.isDraped??!1}get isDraped(){return this._isDraped}set isDraped(e){e!==this._isDraped&&(this._isDraped=e,this.object3dResources.attached=this.attached&&!e,this.drapedResources.attached=this.attached&&e)}get renderGroup(){return this.drapedResources.renderGroup}set renderGroup(e){this.drapedResources.renderGroup=e}createResources(){this.object3dResources.attached=!this._isDraped,this.drapedResources.attached=this._isDraped}destroyResources(){this.object3dResources.attached=!1,this.drapedResources.attached=!1}recreate(){this.object3dResources.recreate(),this.drapedResources.recreate()}recreateGeometry(){this.object3dResources.recreateGeometry(),this.drapedResources.recreateGeometry()}destroy(){this.object3dResources.destroy(),this.drapedResources.destroy(),super.destroy()}updateVisibility(e){this.object3dResources.visible=e,this.drapedResources.visible=e}forEachMaterial(e){this.object3dResources?.forEachMaterial(e),this.drapedResources?.forEachMaterial(e)}};function _e(t,e){let i=t.fragment;i.include(Ee),t.include(Re),i.include(Ce),i.uniforms.add(new v("globalAlpha",r=>r.globalAlpha),new D("glowColor",r=>r.glowColor),new v("glowWidth",(r,a)=>r.glowWidth*a.camera.pixelRatio),new v("glowFalloff",r=>r.glowFalloff),new D("innerColor",r=>r.innerColor),new v("innerWidth",(r,a)=>r.innerWidth*a.camera.pixelRatio),new Me("depthMap",r=>r.depth?.attachment),new W("normalMap",r=>r.normals)),i.code.add(l`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),i.code.add(l`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),i.code.add(l`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),e.contrastControlEnabled?i.uniforms.add(new W("colorTexture",(r,a)=>r.colors),new v("globalAlphaContrastBoost",r=>r.globalAlphaContrastBoost)).code.add(l`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(colorTexture, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):i.code.add(l`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}const N=q(6);function me(t){let e=new ee;e.include(Ae),e.include(_e,t);let{fragment:i,outputs:r}=e;r.add("fragColor","vec4",0);let{lineVerticalPlaneEnabled:a,heightManifoldEnabled:o,pointDistanceEnabled:u,intersectsLineEnabled:h,spherical:d}=t;if(a||o)if(i.uniforms.add(new v("maxPixelDistance",(s,n)=>o?n.camera.computeScreenPixelSizeAt(s.heightManifoldTarget)*2:n.camera.computeScreenPixelSizeAt(s.lineVerticalPlaneSegment.origin)*2)),i.code.add(l`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),d){let s=(c,g,b)=>P(c,g.heightManifoldTarget,b.camera.viewMatrix),n=(c,g)=>P(c,[0,0,0],g.camera.viewMatrix);i.uniforms.add(new C("heightManifoldOrigin",(c,g)=>(s(m,c,g),n(L,g),te(L,L,m),$(_,L),_[3]=H(L),_)),new $e("globalOrigin",c=>n(m,c)),new v("cosSphericalAngleThreshold",(c,g)=>1-Math.max(2,g.camera.computeRenderPixelSizeAtDistance(ie(g.camera.eye,c.heightManifoldTarget)))/H(c.heightManifoldTarget))),i.code.add(l`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else i.code.add(l`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(u&&(i.uniforms.add(new v("maxPixelDistance",(s,n)=>n.camera.computeScreenPixelSizeAt(s.pointDistanceTarget)*2)),i.code.add(l`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),h&&i.uniforms.add(re).code.add(l`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float distance = length(cross(dir, pos - start)) / (length(pos) * screenPixelSizePerDistance);
return abs(distance) - radius;
}`),(a||h)&&i.code.add(l`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),i.main.add(l`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),o){i.uniforms.add(new M("angleCutoff",n=>A(n)),new C("heightPlane",(n,c)=>ve(n.heightManifoldTarget,n.renderCoordsHelper.worldUpAtPosition(n.heightManifoldTarget,m),c.camera.viewMatrix)));let s=d?l`normalize(globalOrigin - pos)`:l`heightPlane.xyz`;i.main.add(l`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${s})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return u&&(i.uniforms.add(new M("angleCutoff",s=>A(s)),new C("pointDistanceSphere",(s,n)=>lt(s,n))),i.main.add(l`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),a&&(i.uniforms.add(new M("angleCutoff",s=>A(s)),new C("lineVerticalPlane",(s,n)=>ct(s,n)),new D("lineVerticalStart",(s,n)=>dt(s,n)),new D("lineVerticalEnd",(s,n)=>ht(s,n))),i.main.add(l`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),h&&(i.uniforms.add(new M("angleCutoff",s=>A(s)),new D("intersectsLineStart",(s,n)=>P(m,s.lineStartWorld,n.camera.viewMatrix)),new D("intersectsLineEnd",(s,n)=>P(m,s.lineEndWorld,n.camera.viewMatrix)),new D("intersectsLineDirection",(s,n)=>(y(_,s.intersectsLineSegment.vector),_[3]=0,$(m,se(_,_,n.camera.viewMatrix)))),new v("intersectsLineRadius",s=>s.intersectsLineRadius)),i.main.add(l`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),i.main.add("fragColor = laserlineOutput(color * depthDiscontinuityAlpha);"),e.include(ne,t),e}function A(t){return oe(ut,Math.cos(t.angleCutoff),Math.cos(Math.max(0,t.angleCutoff-q(2))))}function lt(t,e){return P(G,t.pointDistanceOrigin,e.camera.viewMatrix),G[3]=ie(t.pointDistanceOrigin,t.pointDistanceTarget),G}function ct(t,e){let i=Te(t.lineVerticalPlaneSegment,.5,m),r=t.renderCoordsHelper.worldUpAtPosition(i,pt),a=$(L,t.lineVerticalPlaneSegment.vector),o=Oe(m,r,a);return $(o,o),ve(t.lineVerticalPlaneSegment.origin,o,e.camera.viewMatrix)}function dt(t,e){let i=y(m,t.lineVerticalPlaneSegment.origin);return t.renderCoordsHelper.setAltitude(i,0),P(i,i,e.camera.viewMatrix)}function ht(t,e){let i=le(m,t.lineVerticalPlaneSegment.origin,t.lineVerticalPlaneSegment.vector);return t.renderCoordsHelper.setAltitude(i,0),P(i,i,e.camera.viewMatrix)}function ve(t,e,i){return P(X,t,i),y(_,e),_[3]=0,se(_,_,i),je(X,_,ft)}const ut=ce(),m=f(),_=ae(),pt=f(),L=f(),X=f(),ft=Ue(),G=ae(),gt=Object.freeze(Object.defineProperty({__proto__:null,build:me,defaultAngleCutoff:N},Symbol.toStringTag,{value:"Module"}));function be(t){let e=new ee;e.include(_e,t);let{outputs:i,vertex:r,fragment:a,attributes:o,varyings:u}=e;i.add("fragColor","vec4",0),r.uniforms.add(new Ge("modelView",(d,{camera:s})=>Ie(mt,s.viewMatrix,d.origin)),Fe,new v("glowWidth",(d,{camera:s})=>d.glowWidth*s.pixelRatio),new ze("pixelToNDC",({camera:d})=>oe(_t,2/d.fullViewport[2],2/d.fullViewport[3]))),o.add("start","vec3"),o.add("end","vec3"),t.spherical&&(o.add("startUp","vec3"),o.add("endUp","vec3")),o.add("extrude","vec2"),u.add("uv","vec2"),u.add("vViewStart","vec3"),u.add("vViewEnd","vec3"),u.add("vViewSegmentNormal","vec3"),u.add("vViewStartNormal","vec3"),u.add("vViewEndNormal","vec3");let h=!t.spherical;return r.main.add(l`
    vec3 pos = mix(start, end, extrude.x);
    vec4 viewPos = modelView * vec4(pos, 1);
    vec4 projPos = proj * viewPos;
    vec2 ndcPos = projPos.xy / projPos.w;

    // in planar we hardcode the up vectors to be Z-up */
    ${B(h,l`vec3 startUp = vec3(0, 0, 1);`)}
    ${B(h,l`vec3 endUp = vec3(0, 0, 1);`)}

    // up vector corresponding to the location of the vertex, selecting either startUp or endUp */
    vec3 up = extrude.y * mix(startUp, endUp, extrude.x);
    vec3 viewUp = (modelView * vec4(up, 0)).xyz;

    // Use the projection differential to avoid subtracting two nearly identical NDC positions.
    vec4 projViewUp = proj * vec4(viewUp, 0);
    vec2 projectedUp = projPos.w * projViewUp.xy - projPos.xy * projViewUp.w;
    float projectedUpLengthSq = dot(projectedUp, projectedUp);
    vec2 projUp = projectedUpLengthSq == 0.0 ? vec2(0.0, 1.0) : projectedUp * inversesqrt(projectedUpLengthSq);

    // extrude ndcPos along projUp to the edge of the screen
    vec2 lxy = abs(sign(projUp) - ndcPos);
    ndcPos += length(lxy) * projUp;

    vViewStart = (modelView * vec4(start, 1)).xyz;
    vViewEnd = (modelView * vec4(end, 1)).xyz;

    vec3 viewStartEndDir = vViewEnd - vViewStart;
    vec3 viewStartUp = (modelView * vec4(startUp, 0)).xyz;

    // the normal of the plane that aligns with the segment and the up vector
    vViewSegmentNormal = normalize(cross(viewStartUp, viewStartEndDir));

    // the normal orthogonal to the segment normal and the start up vector
    vViewStartNormal = -normalize(cross(vViewSegmentNormal, viewStartUp));

    // the normal orthogonal to the segment normal and the end up vector
    vec3 viewEndUp = (modelView * vec4(endUp, 0)).xyz;
    vViewEndNormal = normalize(cross(vViewSegmentNormal, viewEndUp));

    // Add enough padding in the X screen space direction for "glow"
    float xPaddingPixels = sign(dot(vViewSegmentNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
    ndcPos.x += xPaddingPixels * pixelToNDC.x;

    // uv is used to read back depth to reconstruct the position at the fragment
    uv = ndcPos * 0.5 + 0.5;

    gl_Position = vec4(ndcPos, 0, 1);
  `),a.uniforms.add(re),a.code.add(l`float planeDistance(vec3 planeNormal, vec3 planeOrigin, vec3 pos) {
return dot(planeNormal, pos - planeOrigin);
}
float segmentDistancePixels(vec3 segmentNormal, vec3 startNormal, vec3 endNormal, vec3 pos, vec3 start, vec3 end) {
float distSegmentPlane = planeDistance(segmentNormal, start, pos);
float distStartPlane = planeDistance(startNormal, start, pos);
float distEndPlane = planeDistance(endNormal, end, pos);
float dist = max(max(distStartPlane, distEndPlane), abs(distSegmentPlane));
float width = fwidth(distSegmentPlane);
float maxPixelDistance = length(pos) * screenPixelSizePerDistance * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}`),a.main.add(l`fragColor = vec4(0.0);
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
return;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
return;
}
float distance = segmentDistancePixels(
vViewSegmentNormal,
vViewStartNormal,
vViewEndNormal,
pos,
vViewStart,
vViewEnd
);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewSegmentNormal))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);`),e.include(ne,t),e}const _t=ce(),mt=qe(),vt=Object.freeze(Object.defineProperty({__proto__:null,build:be},Symbol.toStringTag,{value:"Module"}));let bt=class extends Ne{constructor(){super(...arguments),this.innerColor=K(1,1,1),this.innerWidth=1,this.glowColor=K(1,.5,0),this.glowWidth=8,this.glowFalloff=8,this.globalAlpha=.75,this.globalAlphaContrastBoost=2,this.angleCutoff=q(6),this.pointDistanceOrigin=f(),this.pointDistanceTarget=f(),this.lineVerticalPlaneSegment=I(),this.intersectsLineSegment=I(),this.intersectsLineRadius=3,this.heightManifoldTarget=f(),this.lineStartWorld=f(),this.lineEndWorld=f()}},F=class extends de{constructor(){super(...arguments),this.shader=new he(gt,()=>ue(()=>Promise.resolve().then(()=>Dt),void 0))}};F=p([O("esri.views.3d.webgl-engine.effects.laserlines.LaserlineTechnique")],F);let Pt=class extends bt{constructor(){super(...arguments),this.origin=f()}},z=class extends de{constructor(e,i){super(e,i,pe(i.spherical?Pe:ye)),this.shader=new he(vt,()=>ue(()=>Promise.resolve().then(()=>xt),void 0))}};z=p([O("esri.views.3d.webgl-engine.effects.laserlines.LaserlinePathTechnique")],z);const Pe=fe().vec3f("start").vec3f("end").vec2f("extrude").vec3f("startUp").vec3f("endUp"),ye=fe().vec3f("start").vec3f("end").vec2f("extrude");let J=class{constructor(e){this._renderCoordsHelper=e,this._origin=f(),this._dirty=!1,this._count=0}set vertices(e){let i=We(e.length*3),r=0;for(let a of e)i[r++]=a[0],i[r++]=a[1],i[r++]=a[2];this.buffers=[i]}set buffers(e){if(this._buffers=e,this._buffers.length>0){let i=this._buffers[0],r=Math.floor(i.length/3/2)*3;U(this._origin,i[r],i[r+1],i[r+2])}else U(this._origin,0,0,0);this._dirty=!0}get origin(){return this._origin}draw(e){let i=this._ensureVAO(e);i!=null&&(e.bindVAO(i),e.drawArrays(He.TRIANGLES,0,this._count))}dispose(){this._vao!=null&&this._vao.dispose()}get _layout(){return this._renderCoordsHelper.viewingMode===1?Pe:ye}_ensureVAO(e){return this._buffers==null?null:(this._vao??=this._createVAO(e,this._buffers),this._ensureVertexData(this._vao,this._buffers),this._vao)}_createVAO(e,i){let r=this._createDataBuffer(i);return this._dirty=!1,new Be(e,new Ke(e,pe(this._layout),r))}_ensureVertexData(e,i){if(!this._dirty)return;let r=this._createDataBuffer(i);e.buffer()?.setData(r),this._dirty=!1}_createDataBuffer(e){let i=e.reduce((d,s)=>d+Q(s),0);this._count=i;let r=this._layout.createBuffer(i),a=this._origin,o=0,u=0,h="startUp"in r?this._setUpVectors.bind(this,r):void 0;for(let d of e){for(let s=0;s<d.length;s+=3){let n=U(Y,d[s],d[s+1],d[s+2]);s===0?u=this._renderCoordsHelper.getAltitude(n):this._renderCoordsHelper.setAltitude(n,u);let c=o+s*2;h?.(s,c,d,n);let g=te(Y,n,a);if(s<d.length-3){for(let b=0;b<6;b++)r.start.setVec(c+b,g);r.extrude.setValues(c,0,-1),r.extrude.setValues(c+1,1,-1),r.extrude.setValues(c+2,1,1),r.extrude.setValues(c+3,0,-1),r.extrude.setValues(c+4,1,1),r.extrude.setValues(c+5,0,1)}if(s>0)for(let b=-6;b<0;b++)r.end.setVec(c+b,g)}o+=Q(d)}return r.buffer}_setUpVectors(e,i,r,a,o){let u=this._renderCoordsHelper.worldUpAtPosition(o,yt);if(i<a.length-3)for(let h=0;h<6;h++)e.startUp.setVec(r+h,u);if(i>0)for(let h=-6;h<0;h++)e.endUp.setVec(r+h,u)}};function Q(t){return(t.length/3-1)*2*3}const yt=f(),Y=f();let T=class extends ke{constructor(){super(...arguments),this.contrastControlEnabled=!1,this.spherical=!1}};p([S()],T.prototype,"contrastControlEnabled",void 0),p([S()],T.prototype,"spherical",void 0);class R extends T{constructor(){super(...arguments),this.heightManifoldEnabled=!1,this.pointDistanceEnabled=!1,this.lineVerticalPlaneEnabled=!1,this.intersectsLineEnabled=!1}}p([S()],R.prototype,"heightManifoldEnabled",void 0),p([S()],R.prototype,"pointDistanceEnabled",void 0),p([S()],R.prototype,"lineVerticalPlaneEnabled",void 0),p([S()],R.prototype,"intersectsLineEnabled",void 0);let w=class extends Ze{get requireGeometryDepth(){return!0}constructor(t){super(t),this.isDecoration=!0,this.consumes={required:[k.LASERLINES,"normals"]},this.produces=k.LASERLINES,this._configuration=new R,this._pathConfiguration=new T,this._intersectsLineInfinite=!1,this._pathVerticalPlaneEnabled=!1,this._passParameters=new Pt,this._blit=new Xe(t.view.stage.renderView.techniques,2)}initialize(){this._passParameters.renderCoordsHelper=this.view.renderCoordsHelper,this._configuration.spherical=this.view.state.viewingMode===1,this._configuration.contrastControlEnabled=this.contrastControlEnabled,this._pathConfiguration.spherical=this.view.state.viewingMode===1,this._pathConfiguration.contrastControlEnabled=this.contrastControlEnabled}destroy(){this._pathVerticalPlaneData=Je(this._pathVerticalPlaneData)}get heightManifoldEnabled(){return this._configuration.heightManifoldEnabled}set heightManifoldEnabled(t){this._configuration.heightManifoldEnabled!==t&&(this._configuration.heightManifoldEnabled=t,this.requestRender(1))}get heightManifoldTarget(){return this._passParameters.heightManifoldTarget}set heightManifoldTarget(t){y(this._passParameters.heightManifoldTarget,t),this.requestRender(1)}get pointDistanceEnabled(){return this._configuration.pointDistanceEnabled}set pointDistanceEnabled(t){t!==this._configuration.pointDistanceEnabled&&(this._configuration.pointDistanceEnabled=t,this.requestRender(1))}get pointDistanceTarget(){return this._passParameters.pointDistanceTarget}set pointDistanceTarget(t){y(this._passParameters.pointDistanceTarget,t),this.requestRender(1)}get pointDistanceOrigin(){return this._passParameters.pointDistanceOrigin}set pointDistanceOrigin(t){y(this._passParameters.pointDistanceOrigin,t),this.requestRender(1)}get lineVerticalPlaneEnabled(){return this._configuration.lineVerticalPlaneEnabled}set lineVerticalPlaneEnabled(t){t!==this._configuration.lineVerticalPlaneEnabled&&(this._configuration.lineVerticalPlaneEnabled=t,this.requestRender(1))}get lineVerticalPlaneSegment(){return this._passParameters.lineVerticalPlaneSegment}set lineVerticalPlaneSegment(t){j(t,this._passParameters.lineVerticalPlaneSegment),this.requestRender(1)}get intersectsLineEnabled(){return this._configuration.intersectsLineEnabled}set intersectsLineEnabled(t){t!==this._configuration.intersectsLineEnabled&&(this._configuration.intersectsLineEnabled=t,this.requestRender(1))}get intersectsLineSegment(){return this._passParameters.intersectsLineSegment}set intersectsLineSegment(t){j(t,this._passParameters.intersectsLineSegment),this.requestRender(1)}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(t){t!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=t,this.requestRender(1))}get pathVerticalPlaneEnabled(){return this._pathVerticalPlaneEnabled}set pathVerticalPlaneEnabled(t){t!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=t,this._pathVerticalPlaneData!=null&&this.requestRender(1))}set pathVerticalPlaneVertices(t){this._pathVerticalPlaneData??=new J(this._passParameters.renderCoordsHelper),this._pathVerticalPlaneData.vertices=t,this.pathVerticalPlaneEnabled&&this.requestRender(1)}set pathVerticalPlaneBuffers(t){this._pathVerticalPlaneData??=new J(this._passParameters.renderCoordsHelper),this._pathVerticalPlaneData.buffers=t,this.pathVerticalPlaneEnabled&&this.requestRender(1)}setParameters(t){Qe(this._passParameters,t)&&this.requestRender(1)}render(t){let e=this.input;if(this.isDecoration&&!this.bindParameters.decorations)return e;let i=this.renderingContext,r=t.find(({name:o})=>o==="normals");if(this._passParameters.normals=r?.getTexture(),!this.contrastControlEnabled)return i.bindFramebuffer(e.fbo),this._renderLaserLines(),e;this._passParameters.colors=e.getTexture();let a=this.fboCache.acquire(e.fbo.width,e.fbo.height,"laser lines");return i.bindFramebuffer(a.fbo),i.setClearColor(0,0,0,0),i.clear(16384),this._renderLaserLines(),this._blit.blend(a,e,this.bindParameters)||this.requestRender(1),a.release(),e}_renderLaserLines(){(this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled)&&this._renderUnified(),this.pathVerticalPlaneEnabled&&this._renderPath()}_renderUnified(){if(!this._update())return;let t=this.techniques.getCompiled(F,this._configuration);if(t){let e=this.renderingContext;e.bindTechnique(t,this.bindParameters,this._passParameters),e.screen.draw()}else this.requestRender(1)}_renderPath(){if(this._pathVerticalPlaneData==null)return;let t=this.techniques.getCompiled(z,this._pathConfiguration);if(t){let e=this.renderingContext;this._passParameters.origin=this._pathVerticalPlaneData.origin,e.bindTechnique(t,this.bindParameters,this._passParameters),this._pathVerticalPlaneData.draw(e)}else this.requestRender(1)}_update(){if(this._configuration.hasEmissive=this._pathConfiguration.hasEmissive=this.bindParameters.emissions!==0,!this.intersectsLineEnabled)return!0;let t=this.bindParameters.camera,e=this._passParameters;if(this._intersectsLineInfinite){if(Ye(et(e.intersectsLineSegment.origin,e.intersectsLineSegment.vector),E),E.c0=-Number.MAX_VALUE,!tt(t.frustum,E))return!1;it(E,e.lineStartWorld),rt(E,e.lineEndWorld)}else y(e.lineStartWorld,e.intersectsLineSegment.origin),le(e.lineEndWorld,e.intersectsLineSegment.origin,e.intersectsLineSegment.vector);return!0}get test(){}};p([x({constructOnly:!0})],w.prototype,"contrastControlEnabled",void 0),p([x()],w.prototype,"isDecoration",void 0),p([x()],w.prototype,"consumes",void 0),p([x()],w.prototype,"produces",void 0),w=p([O("esri.views.3d.webgl-engine.effects.laserlines.LaserLineRenderer")],w);const E=st();class Tt extends ge{constructor(e){super(e),this._angleCutoff=N,this._style={},this._heightManifoldTarget=f(),this._heightManifoldEnabled=!1,this._intersectsLine=I(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._lineVerticalPlaneSegment=null,this._pathVerticalPlaneBuffers=null,this._pointDistanceLine=null,this.applyProperties(e)}get testData(){}createResources(){this._ensureRenderer()}destroyResources(){this._disposeRenderer()}updateVisibility(){this._syncRenderer(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance()}get angleCutoff(){return this._angleCutoff}set angleCutoff(e){this._angleCutoff!==e&&(this._angleCutoff=e,this._syncAngleCutoff())}get style(){return this._style}set style(e){this._style=e,this._syncStyle()}get heightManifoldTarget(){return this._heightManifoldEnabled?this._heightManifoldTarget:null}set heightManifoldTarget(e){e==null?this._heightManifoldEnabled=!1:(y(this._heightManifoldTarget,e),this._heightManifoldEnabled=!0),this._syncRenderer(),this._syncHeightManifold()}set intersectsWorldUpAtLocation(e){if(e==null){this.intersectsLine=null;return}let i=this.view.renderCoordsHelper.worldUpAtPosition(e,wt);this.intersectsLine=nt(e,i),this.intersectsLineInfinite=!0}get intersectsLine(){return this._intersectsLineEnabled?this._intersectsLine:null}set intersectsLine(e){e==null?this._intersectsLineEnabled=!1:(j(e,this._intersectsLine),this._intersectsLineEnabled=!0),this._syncIntersectsLine(),this._syncRenderer()}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){this._intersectsLineInfinite=e,this._syncIntersectsLineInfinite()}get lineVerticalPlaneSegment(){return this._lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){this._lineVerticalPlaneSegment=e==null?null:j(e),this._syncLineVerticalPlane(),this._syncRenderer()}get pathVerticalPlane(){return this._pathVerticalPlaneBuffers}set pathVerticalPlane(e){this._pathVerticalPlaneBuffers=e,this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncRenderer()}get pointDistanceLine(){return this._pointDistanceLine}set pointDistanceLine(e){this._pointDistanceLine=e==null?null:{origin:Z(e.origin),target:e.target?Z(e.target):null},this._syncPointDistance(),this._syncRenderer()}get isDecoration(){return this._isDecoration}set isDecoration(e){this._isDecoration=e,this._renderer&&(this._renderer.isDecoration=e)}_syncRenderer(){!this.attached||!this.visible||!(this._intersectsLineEnabled||this._heightManifoldEnabled||this._pointDistanceLine!=null||this._pathVerticalPlaneBuffers!=null)?this._disposeRenderer():this._ensureRenderer()}_ensureRenderer(){this._renderer??(this._renderer=new w({view:this.view,contrastControlEnabled:!0,isDecoration:this.isDecoration}),this._syncStyle(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncIntersectsLineInfinite(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncAngleCutoff())}_syncStyle(){this._renderer!=null&&this._renderer.setParameters(this._style)}_syncAngleCutoff(){this._renderer?.setParameters({angleCutoff:this._angleCutoff})}_syncHeightManifold(){this._renderer!=null&&(this._renderer.heightManifoldEnabled=this._heightManifoldEnabled&&this.visible,this._heightManifoldEnabled&&(this._renderer.heightManifoldTarget=this._heightManifoldTarget))}_syncIntersectsLine(){this._renderer!=null&&(this._renderer.intersectsLineEnabled=this._intersectsLineEnabled&&this.visible,this._intersectsLineEnabled&&(this._renderer.intersectsLineSegment=this._intersectsLine))}_syncIntersectsLineInfinite(){this._renderer!=null&&(this._renderer.intersectsLineInfinite=this._intersectsLineInfinite)}_syncPathVerticalPlane(){this._renderer!=null&&(this._renderer.pathVerticalPlaneEnabled=this._pathVerticalPlaneBuffers!=null&&this.visible,this._pathVerticalPlaneBuffers!=null&&(this._renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))}_syncLineVerticalPlane(){this._renderer!=null&&(this._renderer.lineVerticalPlaneEnabled=this._lineVerticalPlaneSegment!=null&&this.visible,this._lineVerticalPlaneSegment!=null&&(this._renderer.lineVerticalPlaneSegment=this._lineVerticalPlaneSegment))}_syncPointDistance(){if(this._renderer==null)return;let e=this._pointDistanceLine,i=e!=null;this._renderer.pointDistanceEnabled=i&&e.target!=null&&this.visible,i&&(this._renderer.pointDistanceOrigin=e.origin,e.target!=null&&(this._renderer.pointDistanceTarget=e.target))}_disposeRenderer(){this._renderer!=null&&this.view.stage&&(this._renderer.destroy(),this._renderer=null)}forEachMaterial(){}}const wt=f(),Dt=Object.freeze(Object.defineProperty({__proto__:null,build:me,defaultAngleCutoff:N},Symbol.toStringTag,{value:"Module"})),xt=Object.freeze(Object.defineProperty({__proto__:null,build:be},Symbol.toStringTag,{value:"Module"}));export{Tt as l,St as r};
